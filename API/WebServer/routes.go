package WebServer

import (
	"github.com/gofiber/fiber/v2"
)

func setup(app *fiber.App){
	app.Get("/", Start)
	app.Post("/login", Login)
	app.Get("/userInfo", getUserInfo)
	app.Get("/activeSchedule", getActiveSchedule)
}


