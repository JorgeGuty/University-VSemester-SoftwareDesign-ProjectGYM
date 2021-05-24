package WebServer

import (
	"API/WebServer/Controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

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
	client.Post("/registerClientUser", Controllers.RegisterClientUser)

	admin.Post("/preliminarySchedule", Controllers.GetPreliminarySchedule)
	admin.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession)
	admin.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession)
	admin.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule)
	admin.Post("/removeInstructor", Controllers.DeleteInstructor)

	admin.Post("/cancelSession", Controllers.CancelSession)

}

func Setup2(app *fiber.App) {

	client := app.Group("/client")
	client.Post("/reservedSessions", Controllers.GetReservedSessions)
	client.Get("/clientInfo", Controllers.GetClientInfo)
	client.Post("/createClient", Controllers.CreateClient)
	client.Post("/updateClientDetails", Controllers.UpdateClientDetail)
	client.Post("/deleteClient", Controllers.DeleteClient)

	user := app.Group("/user")
	user.Post("/login", Controllers.Login)
	user.Post("/deactivateAccount", Controllers.DeactivateAccount)
	user.Post("/registerClientUser", Controllers.RegisterClientUser)
	user.Post("/updateUserDetails", Controllers.UpdateUserDetails)

	services := app.Group("/services")
	services.Get("/services", Controllers.GetServices)

	sessions := app.Group("/sessions")
	sessions.Get("/activeSchedule", Controllers.GetActiveSchedule)
	sessions.Post("/bookSession", Controllers.BookSession)
	sessions.Post("/cancelBooking", Controllers.CancelBooking)
	sessions.Post("/cancelSession", Controllers.CancelSession)

	instructor := app.Group("/instructor")
	instructor.Post("/instructors", Controllers.GetInstructors)
	instructor.Post("/remove", Controllers.DeleteInstructor)

	preliminarySchedule := app.Group("/preliminarySchedule")
	preliminarySchedule.Post("/preliminarySchedule", Controllers.GetPreliminarySchedule)
	preliminarySchedule.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession)
	preliminarySchedule.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession)
	preliminarySchedule.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule)

}
