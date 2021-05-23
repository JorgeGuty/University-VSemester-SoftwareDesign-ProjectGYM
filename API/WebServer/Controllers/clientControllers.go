package Controllers

import (
	"API/Database/Requests"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetClientInfo(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	user := Requests.GetClientProfileInfo(membershipNumber)

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

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	sessions := Requests.GetReservedSessions(membershipNumber)

	return giveJSONResponse(context, sessions, fiber.StatusOK)
}

func Register(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	username, _ := data["username"]
	password, _ := data["password"]
	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	result := Requests.RegisterClientUser(username, password, membershipNumber)

	return giveJSONResponse(context, result, fiber.StatusOK)
}
