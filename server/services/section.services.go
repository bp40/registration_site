package services

import (
	"github.com/gofiber/fiber/v2/log"
	"time"

	"css325_registration/db"
	"css325_registration/models"
	"github.com/gofiber/fiber/v2"
)

func getYearAndSemester(c *fiber.Ctx) (year int, semester int) {
	year, _ = c.ParamsInt("year")
	semester, _ = c.ParamsInt("semester")

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

	return year, semester
}

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
	year, semester := getYearAndSemester(c)

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

func GetAllWebSections(c *fiber.Ctx) error {
	year, semester := getYearAndSemester(c)

	var sections []models.WebSection
	stmt, err := db.DB.Preparex(`SELECT sections.section_id, timeslot_id, section_number, semester, room_number, max_students, year, instructors.first_name, instructors.last_name, courses.course_code, course_name, credits,
       (SELECT COUNT(*) FROM registrations WHERE registrations.section_id = sections.section_id) AS current_enrolled
FROM sections 
INNER JOIN instructors ON sections.instructor_id = instructors.instructor_id 
INNER JOIN courses ON sections.course_code = courses.course_code 
WHERE year=? AND semester=?`)
	log.Debug(err)
	err = stmt.Select(&sections, year, semester)

	if err != nil {
		log.Debug(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "msg": "cannot get web sections"})
	}

	return c.JSON(sections)
}

func GetSectionsByDepartment(c *fiber.Ctx) error {
	return fiber.ErrNotImplemented
}
