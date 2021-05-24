package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetClientInfo(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	user := Requests.GetClientProfileInfo(membershipNumber)

	return Common.GiveJSONResponse(context, user, fiber.StatusOK)
}
