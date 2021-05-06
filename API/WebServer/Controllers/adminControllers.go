package Controllers

import (
	"API/Database/Requests"
	"API/Models"

	"github.com/gofiber/fiber/v2"
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

	dummySchedule := Requests.GetPreliminarySchedule()

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

	sessionID := 1 //TODO: set session id from body parameter

	result := Requests.InsertPreliminarySession(sessionID)

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

func GetInstructors(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	dummyInstructor := []Models.Instructor{
		Models.Instructor{
			ID:             1,
			Name:           "Instructor1",
			Identification: "1234",
			Email:          "a@aaa.com",
			Type:           "Planta",
		},
		Models.Instructor{
			ID:             2,
			Name:           "Instructor2",
			Identification: "7777",
			Email:          "a@bbba.com",
			Type:           "Temp",
		},
	}
	return giveJSONResponse(context, dummyInstructor, fiber.StatusOK)
}
