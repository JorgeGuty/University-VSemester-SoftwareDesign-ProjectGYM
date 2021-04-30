package Controllers

import (
	_ "API/Database/Requests"
	_ "API/Models"
	"API/WebServer"
	"github.com/dgrijalva/jwt-go"
	_ "github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func Start(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func analyzeToken(context *fiber.Ctx) (bool, *jwt.Token) {

	jwtFromHeader := string(context.Request().Header.Peek("Authorization"))
	isValid, token := WebServer.ValidateUserToken(jwtFromHeader)

	return isValid, token
}

func giveJSONResponse(context *fiber.Ctx, pJSON interface{}, pStatus int) error {
	context.Status(pStatus)
	return context.JSON(pJSON)
}

