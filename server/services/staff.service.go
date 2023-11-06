package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"time"
)

func getStaffFromId(id string) (*models.AuthRegistrar, error) {
	var registrar models.AuthRegistrar
	stmt, err := db.DB.Preparex(`SELECT registrar_id,password FROM registrars WHERE registrar_id=?`)
	log.Debug(id)
	err = stmt.Get(&registrar, id)

	if err != nil {
		log.Debug(err)
		return nil, fiber.ErrInternalServerError
	}

	return &registrar, nil
}

func RegistrarLogin(c *fiber.Ctx) error {

	log.Debug("got request")
	type loginInput struct {
		RegistrarId string `json:"RegistrarId" xml:"RegistrarId" form:"RegistrarId"`
		Password    string `json:"password" xml:"password" form:"password"`
	}

	input := new(loginInput)

	if err := c.BodyParser(input); err != nil {
		log.Debug(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": "error parsing req"})
	}

	log.Info(input.RegistrarId)
	registrarData, err := getStaffFromId(input.RegistrarId)

	if err != nil {
		log.Info("fail user not found")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "message": "user not found"})
	}

	if !CheckPasswordHash(input.Password, registrarData.Password) {
		log.Info("fail credentials")
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "failed", "message": "invalid password"})
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = input.RegistrarId
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	claims["role"] = "staff"

	t, err := token.SignedString([]byte(os.Getenv("JWTSIGN")))
	if err != nil {
		log.Info("fail jwt")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "login success", "token": t})
}
