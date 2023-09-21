package routes

import (
	"css325_registration/middleware"
	"css325_registration/services"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app fiber.Router) {

	// AUTH
	auth := app.Group("/auth")
	auth.Post("/login", services.Login)

	app.Use(middleware.Protected())
	// API
	api := app.Group("/api")
	api.Get("/allSections/", services.GetSectionsInYearSemester)
	api.Get("/sections/:name", services.GetSectionsByCourseName)

	// STUDENTS
	student := app.Group("/student")
	student.Get("/:id", services.GetStudentsById)
	student.Post("/", middleware.VerifyStaff(), services.CreateStudent)
	student.Patch("/:id", services.UpdateStudent)
	student.Delete("/:id", services.DeleteStudent)
}
