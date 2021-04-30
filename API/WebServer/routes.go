package WebServer

import (
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App){
	app.Get("/", Start)
	app.Post("/login", Login)
	app.Get("/userInfo", GetUserInfo)
	app.Get("/activeSchedule", GetActiveSchedule)
	app.Get("/reservedSessions", GetReservedSessions)
}


