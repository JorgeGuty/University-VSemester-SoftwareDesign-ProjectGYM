package WebServer

import (
	"API/WebServer/Controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	client := app.Group("/client")
	client.Post("/clients", Controllers.GetClients)                     // Updated!!!
	client.Post("/clientInfo", Controllers.GetClientInfo)               /// Updated!!!
	client.Post("/createClient", Controllers.CreateClient)              // Updated!!!
	client.Post("/updateClientDetails", Controllers.UpdateClientDetail) // Updated!!!
	client.Post("/deleteClient", Controllers.DeleteClient)              // Not in services (ERROR)
	client.Post("/insertCredit", Controllers.InsertCreditMovement)      // Updated!!!

	//TODO: discuss in which group this request has to be categorized
	client.Get("/paymentMethods", Controllers.GetPaymentMethods) // Not in services

	user := app.Group("/user")
	user.Post("/login", Controllers.Login)                         // Updated!!!
	user.Post("/deactivateAccount", Controllers.DeactivateAccount) // Updated!!!
	user.Post("/registerClientUser", Controllers.RegisterClientUser) // Updated!!!
	user.Post("/updateUserDetails", Controllers.UpdateUserDetails) // Updated!!!

	services := app.Group("/services")
	services.Get("/services", Controllers.GetServices) // Updated!!!
	services.Post("/insertService", Controllers.InsertService) // Updated!!!
	services.Post("/delete", Controllers.DeleteService)            // Updated!!!
	services.Post("/setMaxSpaces", Controllers.SetServiceMaxSpace) //New

	sessions := app.Group("/sessions")
	sessions.Get("/activeSchedule", Controllers.GetActiveSchedule)                 // Updated!!!
	sessions.Post("/bookSession", Controllers.BookSession)                         // Updated!!!
	sessions.Post("/cancelBooking", Controllers.CancelBooking)                     // Updated!!!
	sessions.Post("/cancelSession", Controllers.CancelSession)                     // No implemntar
	sessions.Post("/reservedSessions", Controllers.GetReservedSessions)            // Updated!!!
	sessions.Post("/changeSessionInstructor", Controllers.ChangeSessionInstructor) // Updated!!!

	instructor := app.Group("/instructor")
	instructor.Post("/instructors", Controllers.GetInstructors) // Updated!!!
	instructor.Post("/remove", Controllers.DeleteInstructor)    // Updated!!!
	instructor.Post("/insert", Controllers.InsertInstructor)    // Updated!!!
	instructor.Post("/instructorInfo", Controllers.GetInstructorInfo) // NEW!!!

	preliminarySchedule := app.Group("/preliminarySchedule")
	preliminarySchedule.Post("/preliminarySchedule", Controllers.GetPreliminarySchedule)            // Updated!!!
	preliminarySchedule.Post("/insertPreliminarySession", Controllers.InsertPreliminarySession)     // Updated!!!
	preliminarySchedule.Post("/deletePreliminarySession", Controllers.DeletePreliminarySession)     // Updated!!!
	preliminarySchedule.Post("/confirmPreliminarySchedule", Controllers.ConfirmPreliminarySchedule) // Updated!!!

	room := app.Group("/rooms")
	room.Post("/setMaxSpaces", Controllers.SetRoomMaxSpace) // NEW

}
