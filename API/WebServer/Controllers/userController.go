package Controllers

import (
	"API/Database/Common"
	"API/Database/Requests"
	"API/Models"
	"API/WebServer/Token"

	"github.com/gofiber/fiber/v2"
)

func Login(context *fiber.Ctx) error {
	// mapping data parameters from body
	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}
	username := data[Models.UsernameJsonTag]
	password := data[Models.PasswordJsonTag]

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
	signedToken, err := createToken(login)

	if err != nil {
		return giveJSONResponse(context, Models.Error{Message: Common.CouldNotLoginError}, fiber.StatusInternalServerError)
	}

	// returns login info
	login.Token = signedToken
	login.Identification = "1100"
	return giveJSONResponse(context, login, fiber.StatusOK)
}

func createToken(pUser Models.Login) (string, error) {
	return Token.GetUserSignedToken(pUser.Username, pUser.Type)
}
