package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetNotifications(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}
	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	instructors := Requests.GetNotifications(membershipNumber)

	return Common.GiveJSONResponse(context, instructors, fiber.StatusOK)
}
