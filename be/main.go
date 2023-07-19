package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/odeya2626/expenses/models"
	"github.com/odeya2626/expenses/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	models.Connect()

	app := fiber.New()

	  app.Use(cors.New(cors.Config{
		AllowOrigins: os.Getenv("ALLOW_ORIGINS"),
		AllowHeaders: "Origin, X-Requested-With, Content-Type, Accept",
		AllowMethods: "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	  }))
	routes.Setup(app)

	err = app.Listen(":8000")
	if err != nil {
		panic(err)
	}


}