package main

import (
	"css325_registration/db"
	"css325_registration/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"log"
	"os"
)

func main() {
	app := fiber.New()
	app.Use(recover.New())
	app.Use(helmet.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Access-Control-Allow-Credentials,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin,Authorization",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,DELETE,PATCH,OPTIONS",
	}))

	db.InitDb()

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Println("listening on", port)
	log.Fatal(app.Listen(":" + port))

}
