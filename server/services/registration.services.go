package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"css325_registration/utils"
	"errors"
	"github.com/gofiber/fiber/v2"
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

	query, args, err := sqlx.In("SELECT * FROM sections WHERE section_id IN (?)", sectionIds)
	if err != nil {
		return err
	}

	var sections []models.Section

	err = db.DB.Select(&sections, db.DB.Rebind(query), args)
	if err != nil {
		return err
	}

	var timeslotList []int

	for _, section := range sections {
		if !util.IntSliceContains(timeslotList, section.Timeslot) {
			return errors.New("Timeslot overlap")
		}
		if !checkStudentCapacityOK(section.Id) {
			return errors.New("Section is full")
		}

	}

	return nil
}

func RegisterCourses(c *fiber.Ctx) error {

	studentId := c.QueryInt("student_id")
	allSectionsCSV := c.Query("allSections")

	sectionStrings := strings.Split(allSectionsCSV, ",")

	var sectionIds []int

	for _, sectionId := range sectionStrings {
		id, err := strconv.Atoi(sectionId)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed"})
		}
		sectionIds = append(sectionIds, id)
	}

	err := checkAvailability(sectionIds)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "timeslot overlap"})
	}

	for _, id := range sectionIds {
		section, err := GetSectionById(id)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed"})
		}

		query := "INSERT INTO registrations (student_id, section_id, status, grade, registration_time) VALUES (?,?,?,?,?)"
		datetime := time.Now().Format(time.RFC3339)
		tx := db.DB.MustBegin()
		db.DB.MustExec(query, studentId, section.Id, "ENROLLED", nil, datetime)
		err = tx.Commit()
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "TX failed"})
		}
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "registration success!"})

}
