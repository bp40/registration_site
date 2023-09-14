package services

import (
	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
	"time"
)

func GetSectionsInYearSemester(c *fiber.Ctx) error {
	year := c.QueryInt("year")
	semester := c.QueryInt("semester")

	if year == 0 {
		year = time.Now().Year()
	}

	if semester != 1 && semester != 2 {
		semester = 1
	}

	var sections []models.Section
	stmt, err := db.DB.Preparex(`SELECT * FROM sections WHERE year=? and semester=?`)
	err = stmt.Select(&sections, year, semester)

	if err != nil {
		c.Status(500).SendString("Database Error")
		panic(err)
	}

	return c.JSON(sections)
}
