package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"golang.org/x/crypto/bcrypt"
	"time"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func GetStudentsById(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func CreateStudent(c *fiber.Ctx) error {

	type studentInput struct {
		Password    string `json:"password" db:"password"`
		FirstName   string `json:"first_name" db:"first_name"`
		LastName    string `json:"last_name" db:"last_name"`
		DateOfBirth string `json:"date_of_birth" db:"date_of_birth"`
		Sex         string `json:"sex" db:"sex"`
		EnrollYear  int    `json:"enroll_year,omitempty" db:"enroll_year"`
		Level       string `json:"level" db:"level"`
	}

	input := new(studentInput)

	if err := c.BodyParser(input); err != nil {
		return fiber.ErrBadRequest
	}

	input.EnrollYear = time.Now().Year()
	input.Password, _ = hashPassword(input.Password)

	_, err := db.DB.NamedExec(`INSERT INTO students (
                      first_name, last_name, date_of_birth, sex, password, enroll_year, level)
					VALUES (:first_name, :last_name, :date_of_birth, :sex, :password, :enroll_year, :level)`, &input)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "failed", "message": "failed to create student"})
	}

	return nil
}

func UpdateStudent(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func DeleteStudent(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func StudentEnrolledSectionsId(studentId int) ([]models.SimpleSection, error) {

	var semester int

	if time.Now().Month() >= 6 && time.Now().Month() <= 12 {
		semester = 1
	} else {
		semester = 2
	}

	var sections []models.SimpleSection
	log.Debug("querying registrations")
	stmt, err := db.DB.Preparex("SELECT registrations.section_id, timeslot_id FROM registrations JOIN sections ON registrations.section_id = sections.section_id WHERE registrations.student_id=? AND sections.semester=? AND sections.year=?")
	err = stmt.Select(&sections, studentId, semester, time.Now().Year())
	if err != nil {
		log.Debug("query error student registrations")
		return sections, err
	}

	return sections, nil
}
