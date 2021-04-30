package WebServer

import (
	"API/WebServer/Controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App){
	app.Get("/", Controllers.Start)
	app.Post("/login", Controllers.Login)
	app.Get("/userInfo", Controllers.GetUserInfo)
	app.Get("/activeSchedule", Controllers.GetActiveSchedule)
	app.Get("/reservedSessions", Controllers.GetReservedSessions)
}


