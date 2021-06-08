package Common

import (
	"API/Database/Common"

	"github.com/gofiber/fiber/v2"
)

type Error struct {
	Message string `json:"message"`
}

func GiveJSONResponse(context *fiber.Ctx, pJSON interface{}, pStatus int) error {
	context.Status(pStatus)
	return context.JSON(pJSON)
}

// ? No se si deberia de estar esto aqui por la dependencia
func GiveVoidOperationResponse(context *fiber.Ctx, pResult Common.VoidOperationResult) error {

	var resultStatus int

	if pResult.Success {
		resultStatus = fiber.StatusOK
	} else {
		resultStatus = fiber.StatusInternalServerError
	}

	return GiveJSONResponse(context, pResult, resultStatus)
}
