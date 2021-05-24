package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetPreliminarySchedule(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)

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

	return Common.GiveJSONResponse(context, dummySchedule, fiber.StatusOK)
}

func InsertPreliminarySession(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

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

	return Common.GiveVoidOperationResponse(context, result)

}

func ConfirmPreliminarySchedule(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

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

	return Common.GiveVoidOperationResponse(context, result)

}

func DeletePreliminarySession(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)

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

	return Common.GiveVoidOperationResponse(context, result)
}
