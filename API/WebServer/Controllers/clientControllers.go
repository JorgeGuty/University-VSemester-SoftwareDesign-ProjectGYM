package Controllers

import (
	"API/Database/Requests"
	"github.com/gofiber/fiber/v2"
)

func GetUserInfo (context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	registeredUser := GetUsernameFromToken(token)

	user := Requests.GetClientProfileInfo(registeredUser)

	return giveJSONResponse(context, user, fiber.StatusOK)
}

func GetReservedSessions (context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	sessions := Requests.GetReservedSessions()

	return giveJSONResponse(context, sessions, fiber.StatusOK)
}

func BookSession (context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	username := GetUsernameFromToken(token)
	sessionID := 1 //TODO: set session id from body parameter

	result := Requests.BookSession(username, sessionID)

	var resultStatus int

	if result.Success {
		resultStatus = fiber.StatusOK
	} else {
		resultStatus = fiber.StatusLocked
	}

	return giveJSONResponse(context, result, resultStatus)

}