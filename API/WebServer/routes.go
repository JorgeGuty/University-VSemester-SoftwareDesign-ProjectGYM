package WebServer

import (
	"API/WebServer/Controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	client := app.Group("/client")

	client.Post("/clientInfo", Controllers.GetClientInfo)               // Ready
	client.Post("/createClient", Controllers.CreateClient)              // Not in services
	client.Post("/updateClientDetails", Controllers.UpdateClientDetail) // Not in services
	client.Post("/deleteClient", Controllers.DeleteClient)              // Not in services

	user := app.Group("/user")
	user.Post("/login", Controllers.Login)                           // Updated!!!
	user.Post("/deactivateAccount", Controllers.DeactivateAccount)   // Updated!!!
	user.Post("/registerClientUser", Controllers.RegisterClientUser) // No necesita autorizacion
	user.Post("/updateUserDetails", Controllers.UpdateUserDetails)   // Updated!!!

	services := app.Group("/services")
	services.Get("/services", Controllers.GetServices)         // Updated!!!
	services.Post("/insertService", Controllers.InsertService) // New!

	sessions := app.Group("/sessions")
	sessions.Get("/activeSchedule", Controllers.GetActiveSchedule)                 // Updated!!!
	sessions.Post("/bookSession", Controllers.BookSession)                         // Updated!!!
	sessions.Post("/cancelBooking", Controllers.CancelBooking)                     // Updated!!!
	sessions.Post("/cancelSession", Controllers.CancelSession)                     // Not in services
	sessions.Post("/reservedSessions", Controllers.GetReservedSessions)            // Ready
	sessions.Post("/changeSessionInstructor", Controllers.ChangeSessionInstructor) // New

	instructor := app.Group("/instructor")
	instructor.Post("/instructors", Controllers.GetInstructors) // Updated!!!
	instructor.Post("/remove", Controllers.DeleteInstructor)    // Not in services
	instructor.Post("/insert", Controllers.InsertInstructor)    // NEW

	preliminarySchedule := app.Group("/preliminarySchedule")
	preliminarySchedule.Post("/preliminarySchedule", Controllers.GetPreliminarySchedule)            // Updated!!!
	preliminarySchedule.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession)     // Updated!!!
	preliminarySchedule.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession)     // Updated!!!
	preliminarySchedule.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule) // Updated!!!

}
