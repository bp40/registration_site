package middleware

import (
	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
	"os"
)

func Protected() fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey:   jwtware.SigningKey{Key: []byte(os.Getenv("JWTSIGN"))},
		ErrorHandler: jwtError,
	})
}

func VerifyStaff() fiber.Handler {
	return func(c *fiber.Ctx) error {

		user := c.Locals("user").(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		role := claims["role"].(string)

		if role != "staff" {
			log.Info("invalid staff login detected")
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Unauthorized access",
			})
		}

		return c.Next()
	}
}

func VerifySelfOrStaff() fiber.Handler {
	return func(c *fiber.Ctx) error {

		user := c.Locals("user").(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		role := claims["role"].(string)
		id := claims["id"].(string)

		if id != c.Params("id") && role != "staff" {
			log.Info("Unauthorized: Not self or not staff")
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Unauthorized access",
			})
		}

		return c.Next()
	}
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).
			JSON(fiber.Map{"status": "error", "message": "Missing or malformed JWT", "data": nil})
	}
	return c.Status(fiber.StatusUnauthorized).
		JSON(fiber.Map{"status": "error", "message": "Invalid or expired JWT", "data": nil})
}
