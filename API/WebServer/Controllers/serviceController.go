package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"strconv"

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

func InsertService(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	name := data["name"]
	maxSpaces, _ := strconv.Atoi(data["maxSpaces"])
	cost, _ := data["cost"]

	result := Requests.InsertService(name, maxSpaces, cost)

	return Common.GiveVoidOperationResponse(context, result)
}

func DeleteService(context *fiber.Ctx) error {

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	serviceNumber, _ := strconv.Atoi(data["serviceNumber"])

	result := Requests.DeleteService(serviceNumber)

	return Common.GiveVoidOperationResponse(context, result)
}
