package Controllers

import (
	"API/Database/Requests"
	"API/Models"
	"API/WebServer"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func getUserInfo (context *fiber.Ctx) error {

	isValid, token := analyzeToken(context)

	if !isValid {
		return giveJSONResponse(context, Models.Error{Message: WebServer.InvalidTokenError}, fiber.StatusUnauthorized)
	}

	user := WebServer.GetUsernameFromToken(token)

	fmt.Println(user)

	dummyUser := Requests.GetClientProfileInfo(user)
	return giveJSONResponse(context, dummyUser, fiber.StatusOK)
}
