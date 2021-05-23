package Controllers

import (
	"API/Database/Requests"

	"github.com/gofiber/fiber/v2"
)

func GetServices(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	services := Requests.GetServices()

	return giveJSONResponse(context, services, fiber.StatusOK)
}
