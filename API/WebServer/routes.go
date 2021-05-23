package WebServer

import (
	"API/WebServer/Controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Get("/", Controllers.Start)

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

func Setup2(app *fiber.App) {
	app.Get("/", Controllers.Start)

	client := app.Group("/client")
	client.Post("/reservedSessions", Controllers.GetReservedSessions)

	// ! Esta ruta retorna usuario cliente
	client.Get("/userInfo", Controllers.GetClientInfo)

	user := app.Group("/user")
	user.Post("/login", Controllers.Login)

	services := app.Group("/services")
	services.Get("/list", Controllers.GetServices)

	sessions := app.Group("/sessions")
	sessions.Get("/activeSchedule", Controllers.GetActiveSchedule)
	sessions.Post("/bookSession", Controllers.BookSession)
	sessions.Post("/cancelBooking", Controllers.CancelBooking)
	sessions.Post("/cancelSession", Controllers.CancelSession)

	instructor := app.Group("/instructor")
	instructor.Post("/list", Controllers.GetInstructors)
	instructor.Post("/remove", Controllers.DeleteInstructor)

	preliminarySchedule := app.Group("/preliminarySchedule")
	preliminarySchedule.Post("/preliminarySchedule", Controllers.GetPreliminarySchedule)
	preliminarySchedule.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession)
	preliminarySchedule.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession)
	preliminarySchedule.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule)

}
