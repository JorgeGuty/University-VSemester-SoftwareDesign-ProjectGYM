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

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	serviceNumber, _ := strconv.Atoi(data["serviceNumber"])

	result := Requests.DeleteService(serviceNumber)

	return Common.GiveVoidOperationResponse(context, result)
}

func SetServiceMaxSpace(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	serviceNumber, _ := strconv.Atoi(data["serviceNumber"])
	maxSpaces, _ := strconv.Atoi(data["maxSpaces"])

	result := Requests.SetServiceMaxSpace(serviceNumber, maxSpaces)

	return Common.GiveVoidOperationResponse(context, result)
}

func GetFavoriteServices(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	services := Requests.GetFavoriteServices(membershipNumber)

	return Common.GiveJSONResponse(context, services, fiber.StatusOK)
}

func AddFavoriteService(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])
	serviceNumber, _ := strconv.Atoi(data["serviceNumber"])

	result := Requests.AddFavoriteService(membershipNumber, serviceNumber)

	return Common.GiveVoidOperationResponse(context, result)
}

func RemoveFavoriteService(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])
	serviceNumber, _ := strconv.Atoi(data["serviceNumber"])

	result := Requests.RemoveFavoriteService(membershipNumber, serviceNumber)

	return Common.GiveVoidOperationResponse(context, result)
}
