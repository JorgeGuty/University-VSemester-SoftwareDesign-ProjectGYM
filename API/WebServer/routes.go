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
	general.Get("/services", Controllers.GetServices)
	general.Post("/bookSession", Controllers.BookSession)
	general.Post("/cancelBooking", Controllers.CancelBooking)
	general.Post("/deactivateAccount", Controllers.DeactivateAccount)
	general.Post("/updateUserDetails", Controllers.UpdateUserDetails)

	client.Post("/clientInfo", Controllers.GetClientInfo)
	client.Post("/reservedSessions", Controllers.GetReservedSessions)
	client.Post("/register", Controllers.Register)

	admin.Post("/preliminarySchedule", Controllers.GetPreliminarySchedule)
	admin.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession)
	admin.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession)
	admin.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule)
	admin.Post("/removeInstructor", Controllers.DeleteInstructor)

	admin.Post("/cancelSession", Controllers.CancelSession)

}
