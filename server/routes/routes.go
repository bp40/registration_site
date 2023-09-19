package routes

import (
	"css325_registration/middleware"
	"css325_registration/services"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app fiber.Router) {

	// API
	api := app.Group("/api")
	api.Get("/allSections/", services.GetSectionsInYearSemester)
	api.Get("/sections/:name", services.GetSectionsByCourseName)

	// AUTH
	auth := app.Group("/auth")
	auth.Post("/login", services.Login)

	// STUDENTS
	student := app.Group("/student")
	student.Get("/:id", services.GetStudentsById)
	student.Post("/", services.CreateStudent)
	student.Patch("/:id", middleware.Protected(), services.UpdateStudent)
	student.Delete("/:id", middleware.Protected(), services.DeleteStudent)
}
