package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"API/WebServer/Controllers/Observer/PrizesObserver"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

var prizesNotifier = &PrizesObserver.PrizesNotifier{}

func GetClientInfo(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	user := Requests.GetClientProfileInfo(membershipNumber)

	return Common.GiveJSONResponse(context, user, fiber.StatusOK)
}

func CreateClient(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}

	identification := data["identification"]
	name := data["name"]
	email := data["email"]
	phone := data["phone"]

	result := Requests.CreateClient(identification, name, email, phone)

	return Common.GiveJSONResponse(context, result, fiber.StatusOK)
}

func UpdateClientDetail(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])
	identification := data["identification"]
	name := data["name"]
	email := data["email"]
	phone := data["phone"]

	result := Requests.UpdateClientDetail(membershipNumber, identification, name, email, phone)

	return Common.GiveJSONResponse(context, result, fiber.StatusOK)
}

func DeleteClient(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	result := Requests.DeleteClient(membershipNumber)

	return Common.GiveJSONResponse(context, result, fiber.StatusOK)
}

func GetClients(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}
	filterDebtors, _ := strconv.Atoi(data["filterDebtors"])

	clients := Requests.GetClients(filterDebtors)

	return Common.GiveJSONResponse(context, clients, fiber.StatusOK)
}

func InsertCreditMovement(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}

	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])
	paymentMethodId, _ := strconv.Atoi(data["paymentMethodId"])
	amount := data["amount"]
	subject := data["subject"]

	result := Requests.InsertCreditMovement(membershipNumber, amount, subject, paymentMethodId)

	return Common.GiveJSONResponse(context, result, fiber.StatusOK)
}

func GetPaymentMethods(context *fiber.Ctx) error {

	token := Common.AnalyzeToken(context)

	if token == nil {
		return nil
	}

	paymentMethods := Requests.GetPaymentMethods()

	return Common.GiveJSONResponse(context, paymentMethods, fiber.StatusOK)
}

func GetSessionParticipants(context *fiber.Ctx) error {

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

	clients := Requests.GetSessionParticipants(date, roomId, startTime)

	return Common.GiveJSONResponse(context, clients, fiber.StatusOK)
}
func GetNotifications(context *fiber.Ctx) error {

	//TODO: Remove Comments
	// token := Common.AnalyzeToken(context)
	// if token == nil {
	// 	return nil
	// }

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}
	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	instructors := Requests.GetNotifications(membershipNumber)

	return Common.GiveJSONResponse(context, instructors, fiber.StatusOK)
}
func NotifyPrizes(context *fiber.Ctx) error {

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {

		return err
	}
	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	instructors := Requests.GetNotifications(membershipNumber)

	return Common.GiveJSONResponse(context, instructors, fiber.StatusOK)
}
