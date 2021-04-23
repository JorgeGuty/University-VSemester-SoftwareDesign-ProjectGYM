package WebServer

import "github.com/gofiber/fiber/v2"

func StartServer() {
	app := fiber.New()
	
	setup(app)
	app.Listen(":3000")
}

