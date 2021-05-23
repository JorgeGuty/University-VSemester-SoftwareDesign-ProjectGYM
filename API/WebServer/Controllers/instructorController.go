package Controllers

import (
	"API/Database/Requests"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetInstructors(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}
	filterByService, _ := strconv.Atoi(data["filterByService"])
	instructorService := data["service"]
	filterByType, _ := strconv.Atoi(data["filterByType"])
	instructorType := data["type"]

	instructors := Requests.GetInstructors(filterByService, instructorService, filterByType, instructorType)

	return giveJSONResponse(context, instructors, fiber.StatusOK)
}

func DeleteInstructor(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	instructorNumber, _ := strconv.Atoi(data["instructorNumber"])

	result := Requests.DeleteInstructor(instructorNumber)

	return giveVoidOperationResponse(context, result)
}
