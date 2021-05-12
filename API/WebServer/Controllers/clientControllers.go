package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Token"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetUserInfo(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	registeredUser := Token.GetUsernameFromToken(token)

	user := Requests.GetClientProfileInfo(registeredUser)

	return giveJSONResponse(context, user, fiber.StatusOK)
}

func GetReservedSessions(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}
	username := Token.GetUsernameFromToken(token)

	sessions := Requests.GetReservedSessions(username)

	return giveJSONResponse(context, sessions, fiber.StatusOK)
}

func BookSession(context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	username := Token.GetUsernameFromToken(token)
	date := data["roomId"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.BookSession(username, date, roomId, startTime)

	return giveVoidOperationResponse(context, result)

}

func CancelBookedSession(context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	username := Token.GetUsernameFromToken(token)
	date := data["roomId"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.CancelBooking(username, date, roomId, startTime)

	return giveVoidOperationResponse(context, result)

}
