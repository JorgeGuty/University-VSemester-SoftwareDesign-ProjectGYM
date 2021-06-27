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
	startTime := data["time"]

	clients := Requests.GetSessionParticipants(date, roomId, startTime)

	return Common.GiveJSONResponse(context, clients, fiber.StatusOK)
}

func GetMonthlyPrizes(context *fiber.Ctx) error {
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

	prizes := Requests.GetMonthlyPrizes(month, year)

	prizesNotifier.Reset()
	for _, prize := range prizes {
		newObserver := &PrizesObserver.ClientPrizeObserver{
			PrizeName:    prize.PrizeName,
			MembershipId: prize.MembershipId,
		}
		prizesNotifier.Register(newObserver)
	}

	return Common.GiveJSONResponse(context, prizes, fiber.StatusOK)
}

func NotifyPrizes(context *fiber.Ctx) error {
	token := Common.AnalyzeToken(context)
	if token == nil {
		return nil
	}

	go prizesNotifier.NotifyAll()

	return Common.GiveJSONResponse(context, context.JSON(""), fiber.StatusOK)
}
