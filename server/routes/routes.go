package routes

import (
	"css325_registration/middleware"
	"css325_registration/services"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app fiber.Router) {

	// HOME
	app.Static("/", "../client/registration-site/dist")

	// AUTH
	auth := app.Group("/auth")
	auth.Post("/login", services.Login)

	// SECTIONS
	sections := app.Group("/sections")
	sections.Use(middleware.Protected())

	sections.Get("/:semester/:year", services.GetAllWebSections)
	sections.Get("/name", services.GetSectionsByCourseName)
	sections.Get("/courseCode", services.GetSectionsByCourseCode)
	sections.Get("/sectionId", middleware.VerifyStaff(), services.GetStudentsInSectionId)

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
