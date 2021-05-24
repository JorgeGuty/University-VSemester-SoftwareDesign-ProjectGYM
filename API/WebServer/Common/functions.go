package Common

import (
	"API/WebServer/Token"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func AnalyzeToken(context *fiber.Ctx) *jwt.Token {

	jwtFromHeader := string(context.Request().Header.Peek("Authorization"))
	isValid, token := Token.ValidateUserToken(jwtFromHeader)

	if !isValid {
		_ = GiveJSONResponse(context, Error{Message: InvalidTokenError}, fiber.StatusUnauthorized)
		return nil
	}

	return token
}
