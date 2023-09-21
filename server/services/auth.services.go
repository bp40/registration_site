package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"golang.org/x/crypto/bcrypt"
)

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func getStudentFromId(id string) (*models.AuthStudent, error) {
	var student models.AuthStudent
	stmt, err := db.DB.Preparex(`SELECT student_id, password FROM students WHERE student_id = ?`)
	err = stmt.Get(&student, id)

	if err != nil {
		return nil, fiber.ErrInternalServerError
	}

	return &student, nil
}

func Login(c *fiber.Ctx) error {

	type loginInput struct {
		StudentId string `json:"StudentId" xml:"StudentId" form:"StudentId"`
		Password  string `json:"password" xml:"password" form:"password"`
	}

	input := new(loginInput)

	if err := c.BodyParser(input); err != nil {
		return err
	}

	log.Debug(input.StudentId)
	log.Debug(input.Password)

	studentData, err := getStudentFromId(input.StudentId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": "user not found"})
	}

	if !CheckPasswordHash(input.Password, studentData.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "failed", "message": "invalid password"})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "login success"})
}
