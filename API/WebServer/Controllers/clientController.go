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
