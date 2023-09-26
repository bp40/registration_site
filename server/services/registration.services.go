package services

import (
	"github.com/gofiber/fiber/v2"
	"strconv"
	"strings"
)

func verifyTimeslot(sectionIds []int) error {

	return fiber.ErrNotImplemented
}

func RegisterCourses(c *fiber.Ctx) error {

	studentId := c.QueryInt("student_id")
	allSectionsCSV := c.Query("allSections")

	sectionStrings := strings.Split(allSectionsCSV, ",")

	var sectionIds []int

	for _, sectionId := range sectionStrings {
		id, err := strconv.Atoi(sectionId)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed"})
		}
		sectionIds = append(sectionIds, id)
	}

	err := verifyTimeslot(sectionIds)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "failed", "error": "timeslot not ok"})
	}

	return fiber.ErrNotImplemented

}
