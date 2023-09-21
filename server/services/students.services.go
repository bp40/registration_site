package services

import (
	"css325_registration/db"
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

	log.Debug(input.FirstName)
	log.Debug(input.DateOfBirth)

	_, err := db.DB.NamedExec(`INSERT INTO students (
                      first_name, last_name, date_of_birth, sex, password, enroll_year, level)
					VALUES (:first_name, :last_name, :date_of_birth, :sex, :password, :enroll_year, :level)`, &input)

	log.Debug(err)

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
