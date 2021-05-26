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
	client.Post("/reservedSessions", Controllers.GetReservedSessions) // NO SIRVE
	client.Get("/clientInfo", Controllers.GetClientInfo) // NO SIRVE
	client.Post("/createClient", Controllers.CreateClient) // Not in services
	client.Post("/updateClientDetails", Controllers.UpdateClientDetail) // Not in services
	client.Post("/deleteClient", Controllers.DeleteClient) // Not in services

	user := app.Group("/user")
	user.Post("/login", Controllers.Login) // LISTOP
	user.Post("/deactivateAccount", Controllers.DeactivateAccount) // Not in services
	user.Post("/registerClientUser", Controllers.RegisterClientUser) // Not in services
	user.Post("/updateUserDetails", Controllers.UpdateUserDetails) // Updated!!! (no lo puedo probar)

	services := app.Group("/services")
	services.Get("/services", Controllers.GetServices) // LISTOP

	sessions := app.Group("/sessions")
	sessions.Get("/activeSchedule", Controllers.GetActiveSchedule) // LISTOP
	sessions.Post("/bookSession", Controllers.BookSession) // LISTOP
	sessions.Post("/cancelBooking", Controllers.CancelBooking) // LISTOP
	sessions.Post("/cancelSession", Controllers.CancelSession) // LISTOP (no se cual es la diferencia)

	instructor := app.Group("/instructor")
	instructor.Post("/instructors", Controllers.GetInstructors) // LISTOP
	instructor.Post("/remove", Controllers.DeleteInstructor) // Not in services

	preliminarySchedule := app.Group("/preliminarySchedule")
	preliminarySchedule.Post("/preliminarySchedule", Controllers.GetPreliminarySchedule) // LISTOP
	preliminarySchedule.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession) // LISTOP
	preliminarySchedule.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession) // LISTOP
	preliminarySchedule.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule) // Updated!!!

}
