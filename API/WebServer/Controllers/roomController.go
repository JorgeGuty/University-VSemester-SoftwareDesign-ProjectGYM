package Controllers

import (
	"API/Database/Requests"
	"API/WebServer/Common"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func SetRoomMaxSpace(context *fiber.Ctx) error {

	// token := Common.AnalyzeToken(context)

	// if token == nil {
	// 	return nil
	// }

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	serviceNumber, _ := strconv.Atoi(data["roomNumber"])
	maxSpaces, _ := strconv.Atoi(data["maxSpaces"])

	result := Requests.SetRoomMaxSpace(serviceNumber, maxSpaces)

	return Common.GiveVoidOperationResponse(context, result)
}
