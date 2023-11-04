package services

import (
	"css325_registration/db"
	"css325_registration/models"
	util "css325_registration/utils"
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/jmoiron/sqlx"
	"strconv"
	"strings"
	"time"
)

func checkStudentCapacityOK(sectionId string) bool {
	var currentStudents int
	var maxStudents int

	err := db.DB.QueryRow(`SELECT COUNT(*) FROM registrations WHERE section_id=? AND status=?`, sectionId, "ENROLLED").Scan(&currentStudents)

	if err != nil {
		log.Debug("select count failed")
		return false
	}

	log.Info(currentStudents)

	if err != nil {
		log.Debug("failed to get enrolled courses")
		log.Debug(err)
		return false
	}

	err = db.DB.QueryRow(`SELECT max_students FROM sections WHERE section_id=?`, sectionId).Scan(&maxStudents)

	log.Info(maxStudents)

	if currentStudents < maxStudents {
		log.Debug("curr std < max")
		return true
	} else {
		log.Debug("curr std > max")
		return false
	}

}

func checkAvailability(sectionIds []int, studentId int) error {

	query, args, err := sqlx.In("SELECT * FROM sections WHERE section_id IN (?);", sectionIds)
	query = db.DB.Rebind(query)
	if err != nil {
		return err
	}

	enrolledSectionIds, err := StudentEnrolledSectionsId(studentId)
	if err != nil {
		log.Debug("cannot get enrolled sections")
		return err
	}
	var timeslotList []int
	var enrolledIds []string

	for _, sec := range enrolledSectionIds {
		enrolledIds = append(enrolledIds, sec.Id)
		timeslotList = append(timeslotList, sec.Timeslot)
	}

	rows, err := db.DB.Queryx(query, args...)

	for rows.Next() {
		var section models.Section
		err = rows.StructScan(&section)

		//check duplicate timeslot
		if util.SliceContains(timeslotList, section.Timeslot) {
			return errors.New("timeslot overlap timeslot:" + string(rune(section.Timeslot)))
		}

		//check duplicate section
		if util.SliceContains(enrolledIds, section.Id) {
			return errors.New("already enrolled in section: " + section.Id)
		}

		if !checkStudentCapacityOK(section.Id) {
			return errors.New("section full id:" + section.Id)
		}

		timeslotList = append(timeslotList, section.Timeslot)
	}

	return nil
}

func RegisterCourses(c *fiber.Ctx) error {

	type registerRequest struct {
		StudentId      int    `json:"student_id" form:"student_id"`
		AllSectionsCSV string `json:"all_sections_csv" form:"all_sections_csv"`
	}

	log.Info("1 Got reg request")
	req := new(registerRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error parsing section", "error": err.Error()})
	}
	log.Info("2 Parsed req")
	sectionStrings := strings.Split(req.AllSectionsCSV, ",")
	log.Debug(sectionStrings)
	var sectionIds []int

	for _, secId := range sectionStrings {
		id, err := strconv.Atoi(secId)
		if err != nil {
			log.Debug(err)
			log.Debug(id)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error parsing section"})
		}
		sectionIds = append(sectionIds, id)
	}
	log.Info("parsed string")

	err := checkAvailability(sectionIds, req.StudentId)
	if err != nil {
		log.Debug(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "not available", "err": err.Error()})
	}
	log.Info("Passed availability test")
	for _, id := range sectionIds {
		log.Info("get id")
		section, err := GetSectionById(id)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail getting section id"})
		}
		log.Info("id found")
		query := "INSERT INTO registrations (student_id, section_id, status, grade, registration_time) VALUES (?,?,?,?,?)"
		datetime := time.Now().Format(time.RFC3339)
		tx := db.DB.MustBegin()
		_, err = db.DB.Exec(query, req.StudentId, section.Id, "ENROLLED", nil, datetime)
		if err != nil {
			log.Error(err.Error())
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "Database Exec Failed"})
		}
		err = tx.Commit()
		if err != nil {
			log.Error(err.Error())
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "TX failed"})
		}
		log.Info("tx complete")
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "registration success!"})

}
