package main

import (
	"css325_registration/db"
	"css325_registration/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New()
	app.Use(recover.New())
	//app.Use(csrf.New())
	app.Use(helmet.New())
	app.Use(logger.New())

	db.InitDb()

	routes.SetupRoutes(app)

	app.Listen(":3000")
}
