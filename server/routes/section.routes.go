package routes

import (
	"css325_registration/services"
	"github.com/gofiber/fiber/v2"
)

func ApiRoutes(app fiber.Router) {
	r := app.Group("/api")

	r.Get("/allSections/", services.GetSectionsInYearSemester)
	r.Get("/sections/:name", services.GetSectionsByCourseName)
}
