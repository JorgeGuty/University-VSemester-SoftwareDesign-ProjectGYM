package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Token"
	"github.com/gofiber/fiber/v2"
	"strconv"
)

func GetUserInfo (context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	registeredUser := Token.GetUsernameFromToken(token)

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

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	username := Token.GetUsernameFromToken(token)
	sessionID, _ := strconv.Atoi(data["SessionID"])

	result := Requests.BookSession(username, sessionID)

	return giveVoidOperationResponse(context, result)

}

func CancelBookedSession (context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	username := Token.GetUsernameFromToken(token)
	sessionID := 1 //TODO: set session id from body parameter

	result := Requests.CancelBookedSession(username, sessionID)

	return giveVoidOperationResponse(context, result)

}