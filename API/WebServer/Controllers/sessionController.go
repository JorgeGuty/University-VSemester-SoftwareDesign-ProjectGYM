package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetActiveSchedule(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}
	schedule := Requests.GetCurrentSessionSchedule()

	return Common.GiveJSONResponse(context, schedule, fiber.StatusOK)
}

func GetReservedSessions(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	sessions := Requests.GetReservedSessions(membershipNumber)

	return Common.GiveJSONResponse(context, sessions, fiber.StatusOK)
}

func BookSession(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)
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

	return Common.GiveVoidOperationResponse(context, result)

}

func CancelBooking(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)
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

	return Common.GiveVoidOperationResponse(context, result)

}

func CancelSession(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)

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

	return Common.GiveVoidOperationResponse(context, result)
}

func ChangeSessionInstructor(context *fiber.Ctx) error {

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	newInstructorNumber, _ := strconv.Atoi(data["instructorNumber"])
	date := data["date"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.ChangeSessionInstructor(date, roomId, startTime, newInstructorNumber)

	return Common.GiveVoidOperationResponse(context, result)
}
