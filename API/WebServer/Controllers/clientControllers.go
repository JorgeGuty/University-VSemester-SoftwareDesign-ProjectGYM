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

	user := Requests.GetReservedSessions()

	return giveJSONResponse(context, user, fiber.StatusOK)
}
