package routes

import (
	"css325_registration/middleware"
	"css325_registration/services"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app fiber.Router) {

	// HOME
	app.Static("/", "../client/registration_site/dist")

	// AUTH
	auth := app.Group("/auth")
	auth.Post("/login", services.Login)

	app.Use(middleware.Protected())
	// API
	api := app.Group("/api")
	api.Get("/sections/:semester/:year", services.GetSectionsInYearSemester)
	api.Get("/sections/:name", services.GetSectionsByCourseName)
	api.Get("/sections/:courseCode", services.GetSectionsByCourseCode)

	// STUDENTS
	student := app.Group("/student")
	student.Get("/:id", services.GetStudentsById)
	student.Post("/", middleware.VerifyStaff(), services.CreateStudent)
	student.Patch("/:id", services.UpdateStudent)
	student.Delete("/:id", services.DeleteStudent)
}
