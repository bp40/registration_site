package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
	"strconv"
	"time"
)

func GetSections(c *fiber.Ctx) error {
	year, err := strconv.Atoi(c.Params("year"))
	semester := c.Params("semester")
	if year == 0 {
		year = time.Now().Year()
	}
	if semester == "" {
		semester = "1"
	}

	var sections []models.Section
	err = db.DB.Select(&sections, "SELECT * FROM sections WHERE year = ? AND semester = ?", year, semester)
	if err != nil {
		panic(err)
	}

	return c.JSON(sections)
}
