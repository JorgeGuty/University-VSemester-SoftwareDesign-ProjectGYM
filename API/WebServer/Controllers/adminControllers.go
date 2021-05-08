package Controllers

import (
	"API/Database/Requests"
	"github.com/gofiber/fiber/v2"
	"strconv"
)

func CancelSession(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	sessionID := 1 //TODO: set session id from body parameter

	result := Requests.CancelSession(sessionID)

	var resultStatus int

	if result.Success {
		resultStatus = fiber.StatusOK
	} else {
		resultStatus = fiber.StatusLocked
	}

	return giveJSONResponse(context, result, resultStatus)
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

	sessionID := 1 //TODO: set session id from body parameter

	result := Requests.DeletePreliminarySession(sessionID)

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
	instructorIdentification := data["instructorIdentification"]
	roomId, _ := strconv.Atoi(data["roomId"])

	result := Requests.InsertPreliminarySession(name, weekDay, month, year, startTime, durationMins, service, instructorIdentification, roomId)

	return giveVoidOperationResponse(context, result)

}

func ConfirmPreliminarySchedule(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	result := Requests.ConfirmPreliminarySchedule()

	return giveVoidOperationResponse(context, result)

}

