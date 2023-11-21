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
	var student []models.WebStudent

	stmt, err := db.DB.Preparex("SELECT student_id, first_name, last_name, date_of_birth, sex, enroll_year, level FROM students WHERE student_id=?")
	if err != nil {
		log.Error(err)
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "cannot fetch student with id"})
	}

	err = stmt.Select(&student)
	if err != nil {
		log.Error(err)
	}

	return c.JSON(student)
}

func GetAllStudents(c *fiber.Ctx) error {

	var students []models.WebStudent
	stmt, err := db.DB.Preparex("SELECT student_id, first_name, last_name, date_of_birth, sex, enroll_year, level FROM students")

	err = stmt.Select(&students)

	if err != nil {
		log.Error(err)
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "cannot fetch students"})
	}

	return c.JSON(students)
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

	result, err := db.DB.NamedExec(`INSERT INTO students (
                      first_name, last_name, date_of_birth, sex, password, enroll_year, level)
					VALUES (:first_name, :last_name, :date_of_birth, :sex, :password, :enroll_year, :level)`, &input)

	studentId, err := result.LastInsertId()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "failed", "message": "failed to create student"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "student_id": studentId})
}

func UpdateStudent(c *fiber.Ctx) error {

	type updateInfo struct {
		StudentId   int    `json:"StudentId" db:"student_id"`
		FirstName   string `json:"first_name" db:"first_name"`
		LastName    string `json:"last_name" db:"last_name"`
		Sex         string `json:"sex" db:"sex"`
		DateOfBirth string `json:"date_of_birth" db:"date_of_birth"`
		EnrollYear  int    `json:"enroll_year" db:"enroll_year"`
		Level       string `json:"level" db:"level"`
		Password    string `json:"RawPassword"`
	}

	input := new(updateInfo)

	if err := c.BodyParser(input); err != nil {
		log.Error("cannot parse updateInfo")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": "failed to retrieve student id"})
	}

	input.Password, _ = hashPassword(input.Password)

	result, err := db.DB.NamedExec(`UPDATE students SET first_name=:first_name, last_name=:last_name, sex=:sex, date_of_birth=:date_of_birth, enroll_year=:enroll_year, level=:level, password=:password WHERE student_id=:student_id`, input)
	log.Info(result)

	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusNotModified).JSON(fiber.Map{"status": "not modified", "message": "failed to update student info"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "updated"})
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
