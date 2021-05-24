package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"

	"github.com/gofiber/fiber/v2"
)

func GetServices(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	services := Requests.GetServices()

	return Common.GiveJSONResponse(context, services, fiber.StatusOK)
}
