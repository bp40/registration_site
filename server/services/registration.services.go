package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"css325_registration/utils"
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

	stmt, err := db.DB.Preparex(`SELECT COUNT(*) FROM registrations WHERE section_id=? AND status=?`)
	err = stmt.Select(currentStudents, sectionId, "ENROLLED")

	if err != nil {
		return false
	}

	stmt, err = db.DB.Preparex(`SELECT max_students FROM sections WHERE section_id=?`)
	err = stmt.Select(maxStudents, sectionId)

	if currentStudents < maxStudents {
		return true
	} else {
		return false
	}

}

func checkAvailability(sectionIds []int) error {
	//THIS IS BROKEN ATM. sectionID doesnt really work
	query, args, err := sqlx.In("SELECT * FROM sections WHERE section_id IN (?)", sectionIds)
	if err != nil {
		return err
	}
	var sections []models.Section

	err = db.DB.Select(&sections, db.DB.Rebind(query), args)
	if err != nil {
		log.Error(err)
		return err
	}
	var timeslotList []int

	for _, section := range sections {
		log.Debug(section.Timeslot)
		if !util.IntSliceContains(timeslotList, section.Timeslot) {
			return errors.New("Timeslot overlap")
		} else {
			timeslotList = append(timeslotList, section.Timeslot)
		}
		if !checkStudentCapacityOK(section.Id) {
			return errors.New("Section is full")
		}

	}

	return nil
}

func RegisterCourses(c *fiber.Ctx) error {

	type registerRequest struct {
		StudentId      int    `json:"student_id" form:"student_id"`
		AllSectionsCSV string `json:"all_sections_csv" form:"all_sections_csv"`
	}

	req := new(registerRequest)
	if err := c.BodyParser(req); err != nil {
		return fiber.ErrBadRequest
	}

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

	err := checkAvailability(sectionIds)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "timeslot overlap", "err": err})
	}

	for _, id := range sectionIds {
		section, err := GetSectionById(id)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail getting section id"})
		}

		query := "INSERT INTO registrations (student_id, section_id, status, grade, registration_time) VALUES (?,?,?,?,?)"
		datetime := time.Now().Format(time.RFC3339)
		tx := db.DB.MustBegin()
		db.DB.MustExec(query, req.StudentId, section.Id, "ENROLLED", nil, datetime)
		err = tx.Commit()
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "TX failed"})
		}
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "registration success!"})

}
