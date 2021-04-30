package WebServer

import (
	"API/WebServer/Controllers"
	"github.com/gofiber/fiber/v2"
)

func setup(app *fiber.App){
	app.Get("/", Controllers.Start)
	app.Post("/login", Controllers.Login)
	app.Get("/userInfo", Controllers.getUserInfo)
	app.Get("/activeSchedule", Controllers.getActiveSchedule)
	app.Get("/reservedSessions", Controllers.getActiveSchedule)
}


