package WebServer

import (
	"API/WebServer/Controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Get("/", Controllers.Start)
	app.Get("/test", Controllers.SqlTests)

	general := app.Group("/general")
	client := app.Group("/client")
	admin := app.Group("/admin")

	general.Post("/login", Controllers.Login)
	general.Get("/activeSchedule", Controllers.GetActiveSchedule)
	general.Post("/instructors", Controllers.GetInstructors)


	client.Get("/userInfo", Controllers.GetUserInfo)
	client.Get("/reservedSessions", Controllers.GetReservedSessions)

	client.Post("/bookSession", Controllers.BookSession)
	client.Post("/cancelBookedSession", Controllers.CancelBookedSession)

	admin.Get("/preliminarySchedule", Controllers.GetPreliminarySchedule)

	admin.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession)
	admin.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession)
	admin.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule)
	admin.Post("/cancelSession", Controllers.CancelSession)

}
