package services

import (
	"database/sql"
	"github.com/gofiber/fiber/v2/log"
	"github.com/jmoiron/sqlx"
	"strconv"
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
	name := "%" + c.Query("course_name") + "%"

	log.Info(name)
	var sections []models.SectionWebResult

	stmt, err := db.DB.Preparex(`SELECT sections.*, courses.course_name, COUNT(*) AS current_students
FROM sections
INNER JOIN courses ON sections.course_code = courses.course_code
LEFT JOIN registrations ON sections.section_id = registrations.section_id AND registrations.status = 'ENROLLED'
WHERE courses.course_name LIKE ?
GROUP BY sections.section_id, courses.course_name;
`)
	if err != nil {
		log.Error(err)
		return fiber.ErrInternalServerError
	}

	err = stmt.Select(&sections, name)
	if err != nil {
		log.Error(err)
		return fiber.ErrInternalServerError
	}

	return c.JSON(sections)
}

func GetSectionsByCourseCode(c *fiber.Ctx) error {
	courseCode := "%" + c.Query("course_code") + "%"

	var sections []models.SectionWebResult
	stmt, err := db.DB.Preparex(`SELECT sections.*, courses.course_name, COUNT(*) AS current_students
FROM sections
INNER JOIN courses ON sections.course_code = courses.course_code
LEFT JOIN registrations ON sections.section_id = registrations.section_id AND registrations.status = 'ENROLLED'
WHERE courses.course_code LIKE ?
GROUP BY sections.section_id, courses.course_name;
`)
	if err != nil {
		log.Error(err)
		return fiber.ErrInternalServerError
	}

	err = stmt.Select(&sections, courseCode)
	if err != nil {
		log.Error(err)
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

func GetStudentsInSectionId(c *fiber.Ctx) error {

	sectionId := c.Params("sectionId")

	var students []models.Student
	stmt, err := db.DB.Preparex(`SELECT * FROM students INNER JOIN registrations r on students.student_id = r.student_id WHERE r.student_id = students.student_id AND r.section_id=?`)
	err = stmt.Select(&students, sectionId)

	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "msg": "cannot get students in section"})
	}

	return c.JSON(students)
}

func GetStudentCurrentSectionsInfo(c *fiber.Ctx) error {
	studentId, _ := c.ParamsInt("id")
	log.Info(studentId)
	sectionsList, err := StudentEnrolledSectionsId(studentId)
	if err != nil {
		log.Error("error fetching student sections")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "msg": "cannot get sections for student"})
	}
	var sectionIds []int
	for _, section := range sectionsList {
		id, _ := strconv.Atoi(section.Id)
		sectionIds = append(sectionIds, id)
	}

	type enrolledSections struct {
		models.WebSection
		Status string          `json:"status"`
		Grade  sql.NullFloat64 `json:"grade"`
	}

	var sections []enrolledSections
	query, args, err := sqlx.In("SELECT sections.section_id, timeslot_id, section_number, semester, room_number, max_students, year, instructors.first_name, instructors.last_name, courses.course_code, course_name, credits, status, grade, (SELECT COUNT(*) FROM registrations WHERE registrations.section_id = sections.section_id) AS current_enrolled FROM sections INNER JOIN instructors ON sections.instructor_id = instructors.instructor_id INNER JOIN courses ON sections.course_code = courses.course_code INNER JOIN registrations ON registrations.section_id = sections.section_id WHERE sections.section_id IN (?);", sectionIds)
	if err != nil {
		log.Error("fail to generate query ", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "msg": "cannot query section ids"})
	}
	query = db.DB.Rebind(query)

	err = db.DB.Select(&sections, query, args...)
	if err != nil {
		log.Error("failed to query for student sections", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "msg": "cannot get fetch sections"})
	}

	return c.JSON(sections)
}
