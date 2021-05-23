package Controllers

import (
	"API/Database/Requests"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetActiveSchedule(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}
	schedule := Requests.GetCurrentSessionSchedule()

	return giveJSONResponse(context, schedule, fiber.StatusOK)
}

func GetReservedSessions(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	clientnumber, _ := strconv.Atoi(data["clientIdentification"])

	sessions := Requests.GetReservedSessions(clientnumber)

	return giveJSONResponse(context, sessions, fiber.StatusOK)
}

func BookSession(context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	clientnumber, _ := strconv.Atoi(data["clientIdentification"])
	date := data["date"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.BookSession(clientnumber, date, roomId, startTime)

	return giveVoidOperationResponse(context, result)

}

func CancelBooking(context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	clientnumber, _ := strconv.Atoi(data["clientIdentification"])
	date := data["date"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.CancelBooking(clientnumber, date, roomId, startTime)

	return giveVoidOperationResponse(context, result)

}

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
