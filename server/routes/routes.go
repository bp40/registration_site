package routes

import (
	"css325_registration/middleware"
	"css325_registration/services"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app fiber.Router) {

	// HOME
	app.Static("/", "../client/registration-site/dist")
	app.Get("/healthz", services.Healthz)

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
	student.Get("/search/:id<int>", middleware.VerifySelfOrStaff(), services.GetStudentCurrentSectionsInfo)
	student.Get("/all", middleware.VerifyStaff(), services.GetAllStudents)
	student.Post("/new", middleware.VerifyStaff(), services.CreateStudent)
	student.Patch("/:id", middleware.VerifyStaff(), services.UpdateStudent)
	student.Delete("/:id", middleware.VerifyStaff(), services.DeleteStudent)

	// REGISTRATIONS
	register := app.Group("/register")
	register.Use(middleware.Protected())
	register.Post("/", services.RegisterCourses)

	//STAFF
	staff := app.Group("/staff")
	staff.Post("/login", services.RegistrarLogin)
	staff.Use(middleware.Protected())
	staff.Use(middleware.VerifyStaff())
}
