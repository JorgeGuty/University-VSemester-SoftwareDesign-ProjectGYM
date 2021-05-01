package Controllers

import (
	"API/Database/Common"
	_ "API/Database/Requests"
	"API/Models"
	_ "API/Models"
	"github.com/dgrijalva/jwt-go"
	_ "github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

type RequestFunction func(*fiber.Ctx) error

func Start(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func analyzeToken(context *fiber.Ctx) *jwt.Token {

	jwtFromHeader := string(context.Request().Header.Peek("Authorization"))
	isValid, token := ValidateUserToken(jwtFromHeader)

	if !isValid {
		_ = giveJSONResponse(context, Models.Error{Message: Common.InvalidTokenError}, fiber.StatusUnauthorized)
		return nil
	}

	return token
}

func giveJSONResponse(context *fiber.Ctx, pJSON interface{}, pStatus int) error {
	context.Status(pStatus)
	return context.JSON(pJSON)
}

func giveVoidOperationResponse(context *fiber.Ctx, pResult Models.VoidOperationResult) error{

	var resultStatus int

	if pResult.Success {
		resultStatus = fiber.StatusOK
	} else {
		resultStatus = fiber.StatusLocked
	}

	return giveJSONResponse(context, pResult, resultStatus)
}



