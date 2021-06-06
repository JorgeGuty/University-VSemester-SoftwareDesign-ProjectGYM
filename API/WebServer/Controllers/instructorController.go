package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetInstructors(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)

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

	return Common.GiveJSONResponse(context, instructors, fiber.StatusOK)
}

func DeleteInstructor(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	instructorNumber, _ := strconv.Atoi(data["instructorNumber"])

	result := Requests.DeleteInstructor(instructorNumber)

	return Common.GiveVoidOperationResponse(context, result)
}

func InsertInstructor(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	name := data["name"]
	identification := data["identification"]
	email := data["email"]
	instructorType := data["type"]

	result := Requests.InsertInstructor(name, identification, email, instructorType)

	return Common.GiveVoidOperationResponse(context, result)
}

func GetInstructorInfo(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	instructorNumber, _ := strconv.Atoi(data["instructorNumber"])

	instructor := Requests.GetInstructorInfo(instructorNumber)
	services := Requests.GetInstructorServices(instructorNumber)
	instructor.Services = services

	return Common.GiveJSONResponse(context, instructor, fiber.StatusOK)
}
