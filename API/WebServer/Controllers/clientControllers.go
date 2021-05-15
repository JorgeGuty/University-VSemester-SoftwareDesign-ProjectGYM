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

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	clientnumber, _ := strconv.Atoi(data["clientIdentification"])

	sessions := Requests.GetReservedSessions(clientnumber)

	return giveJSONResponse(context, sessions, fiber.StatusOK)
}
