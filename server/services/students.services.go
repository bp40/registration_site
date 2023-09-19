package services

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"golang.org/x/crypto/bcrypt"
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
		StudentId   string `json:"studentId" xml:"studentId" form:"studentId"`
		Password    string `json:"password" xml:"password" form:"password"`
		FirstName   string `json:"first_name" xml:"first_name" form:"first_name"`
		LastName    string `json:"last_name" xml:"last_name" form:"last_name"`
		DateOfBirth string `json:"date_of_birth" xml:"date_of_birth" form:"date_of_birth"`
		EnrollYear  int    `json:"enroll_year" xml:"enroll_year" form:"enroll_year"`
		Level       string `json:"level" xml:"level" form:"level"`
	}

	input := new(studentInput)

	if err := c.BodyParser(input); err != nil {
		return err
	}

	log.Debug(input.Password)
	input.Password, _ = hashPassword(input.Password)
	log.Debug(input.Password)

	return fiber.ErrNotImplemented
}

func UpdateStudent(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}

func DeleteStudent(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
