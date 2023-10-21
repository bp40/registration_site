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

	// API
	api := app.Group("/api")
	api.Use(middleware.Protected())
	api.Get("/sections/:semester/:year", services.GetSectionsInYearSemester)
	api.Get("/sections/:name", services.GetSectionsByCourseName)
	api.Get("/sections/:courseCode", services.GetSectionsByCourseCode)

	// STUDENTS
	student := app.Group("/student")
	student.Use(middleware.Protected())
	student.Get("/:id", services.GetStudentsById)
	student.Post("/", middleware.VerifyStaff(), services.CreateStudent)
	student.Patch("/:id", middleware.VerifyStaff(), services.UpdateStudent)
	student.Delete("/:id", middleware.VerifyStaff(), services.DeleteStudent)

	// REGISTRATIONS
	register := app.Group("/register")
	register.Use(middleware.Protected())
	register.Post("/", services.RegisterCourses)
}
