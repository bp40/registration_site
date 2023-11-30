package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"os"
	"strconv"
	"time"
)

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func getStudentFromId(id string) (*models.AuthStudent, error) {
	var student models.AuthStudent
	stmt, err := db.DB.Preparex(`SELECT student_id, first_name ,password FROM students WHERE student_id = ?`)
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

	studentData, err := getStudentFromId(input.StudentId)

	if err != nil {
		log.Info("fail user not found")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": "user not found"})
	}

	if !CheckPasswordHash(input.Password, studentData.Password) {
		log.Info("fail credentials")
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "failed", "message": "invalid password"})
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = input.StudentId
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	claims["role"] = "student"

	t, err := token.SignedString([]byte(os.Getenv("JWTSIGN")))
	if err != nil {
		log.Info("fail jwt")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "login success", "token": t, "name": studentData.FirstName})
}

func getIdFromJWT(c *fiber.Ctx) int {

	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	id, err := strconv.Atoi(claims["id"].(string))

	if err != nil {
		log.Debug("id from jwt err")
	}

	return id
}
