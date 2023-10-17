package services

import (
	"github.com/gofiber/fiber/v2/log"
	"time"

	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
)

func GetSectionById(id int) (models.Section, error) {
	var section models.Section
	//stmt, err := db.DB.Preparex(`SELECT * FROM sections WHERE id=?`)
	//err = stmt.Select(&section, id)

	rows, err := db.DB.Queryx("SELECT * FROM sections WHERE section_id=?", id)

	for rows.Next() {
		err = rows.StructScan(&section)
	}

	if err != nil {
		log.Error("GetSectionById error")
		log.Error(err)
		return section, err
	}

	return section, nil

}

func GetSectionsInYearSemester(c *fiber.Ctx) error {
	year, _ := c.ParamsInt("year")
	semester, _ := c.ParamsInt("semester")

	if year == 0 {
		year = time.Now().Year()
	}

	if semester != 1 && semester != 2 {
		if time.Now().Month() >= 6 && time.Now().Month() <= 12 {
			semester = 1
		} else {
			semester = 2
		}
	}

	var sections []models.Section
	stmt, err := db.DB.Preparex(`SELECT * FROM sections WHERE year=? and semester=?`)
	err = stmt.Select(&sections, year, semester)

	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.JSON(sections)
}

func GetSectionsByCourseName(c *fiber.Ctx) error {
	name := c.Params("course_name")

	var sections []models.Section
	stmt, err := db.DB.Preparex(`SELECT * FROM sections WHERE name = ?`)
	err = stmt.Select(&sections, name)

	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.JSON(sections)
}

func GetSectionsByCourseCode(c *fiber.Ctx) error {
	courseCode := c.Params("course_code")

	var sections []models.Section
	stmt, err := db.DB.Preparex(`SELECT * FROM sections WHERE course_code = ?`)
	err = stmt.Select(&sections, courseCode)

	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.JSON(sections)
}

func GetSectionsByDepartment(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
