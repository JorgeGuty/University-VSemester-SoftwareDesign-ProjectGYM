package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Token"

	"github.com/gofiber/fiber/v2"
)

func GetClientInfo(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	registeredUser := Token.GetUsernameFromToken(token)

	user := Requests.GetClientProfileInfo(registeredUser)

	return giveJSONResponse(context, user, fiber.StatusOK)
}
