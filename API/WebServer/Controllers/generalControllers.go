package Controllers

import (
	"API/Database/Common"
	"API/Database/Requests"
	"API/Models"
	"API/WebServer/Token"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Login(context *fiber.Ctx) error {
	// mapping data parameters from body
	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}
	username := data["username"]
	password := data["password"]

	// db request
	login, success := Requests.GetLogin(username)

	// login existence validation
	if !success {
		return giveJSONResponse(context, Models.Error{Message: Common.InvalidLoginError}, fiber.StatusNotFound)
	}

	//  password validation
	if login.Password != password {
		return giveJSONResponse(context, Models.Error{Message: Common.InvalidLoginError}, fiber.StatusUnauthorized)
	}

	// token creation
	signedToken, err := Token.GetUserSignedToken(login.Username, login.Type)
	if err != nil {
		return giveJSONResponse(context, Models.Error{Message: Common.CouldNotLoginError}, fiber.StatusInternalServerError)
	}

	// returns login info
	login.Token = signedToken
	login.Identification = "1100"
	return giveJSONResponse(context, login, fiber.StatusOK)
}

func GetActiveSchedule(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}
	schedule := Requests.GetCurrentSessionSchedule()

	return giveJSONResponse(context, schedule, fiber.StatusOK)
}

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

func GetServices(context *fiber.Ctx) error {
	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	services := Requests.GetServices()

	return giveJSONResponse(context, services, fiber.StatusOK)
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

	clientIdentification := data["clientIdentification"]
	date := data["date"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.BookSession(clientIdentification, date, roomId, startTime)

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

	clientIdentification := data["clientIdentification"]
	date := data["date"]
	roomId, _ := strconv.Atoi(data["roomId"])
	startTime := data["startTime"]

	result := Requests.CancelBooking(clientIdentification, date, roomId, startTime)

	return giveVoidOperationResponse(context, result)

}

func SqlTests(context *fiber.Ctx) error {

	//good := Requests.TestRequest()
	good := Requests.GetReservedSessions("1100")

	return giveJSONResponse(context, good, fiber.StatusOK)
}
