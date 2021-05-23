package Controllers

import (
	"API/Database/Requests"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CancelSession(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	date := data["date"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.CancelSession(date, roomId, startTime)

	return giveVoidOperationResponse(context, result)
}

func GetPreliminarySchedule(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	// mapping data parameters from body
	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}
	month, _ := strconv.Atoi(data["month"])
	year, _ := strconv.Atoi(data["year"])

	dummySchedule := Requests.GetPreliminarySchedule(month, year)

	return giveJSONResponse(context, dummySchedule, fiber.StatusOK)
}

func DeletePreliminarySession(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}
	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	year, _ := strconv.Atoi(data["year"])
	month, _ := strconv.Atoi(data["month"])
	weekDay, _ := strconv.Atoi(data["weekDay"])
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.DeletePreliminarySession(year, month, weekDay, roomId, startTime)

	return giveVoidOperationResponse(context, result)
}
func InsertPreliminarySession(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	name := data["name"]
	weekDay, _ := strconv.Atoi(data["weekDay"])
	month, _ := strconv.Atoi(data["month"])
	year, _ := strconv.Atoi(data["year"])
	startTime := data["startTime"]
	durationMins, _ := strconv.Atoi(data["durationMins"])
	service := data["service"]
	instructorNumber, _ := strconv.Atoi(data["instructorIdentification"])
	roomId, _ := strconv.Atoi(data["roomId"])

	result := Requests.InsertPreliminarySession(name, weekDay, month, year, startTime, durationMins, service, instructorNumber, roomId)

	return giveVoidOperationResponse(context, result)

}

func ConfirmPreliminarySchedule(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	month, _ := strconv.Atoi(data["month"])
	year, _ := strconv.Atoi(data["year"])

	result := Requests.ConfirmPreliminarySchedule(month, year)

	return giveVoidOperationResponse(context, result)

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
