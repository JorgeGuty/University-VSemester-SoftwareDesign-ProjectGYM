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
	username := data[UsernameJsonTag]
	password := data[PasswordJsonTag]

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
	return giveJSONResponse(context, login, fiber.StatusOK)
}

func createToken(pUser Models.Login) (string, error) {
	return Token.GetUserSignedToken(pUser.Username, pUser.Type)
}

func RegisterClientUser(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	username, _ := data["username"]
	password, _ := data["password"]
	membershipNumber, _ := strconv.Atoi(data["membershipNumber"])

	result := Requests.RegisterClientUser(username, password, membershipNumber)

	return giveJSONResponse(context, result, fiber.StatusOK)
}

func DeactivateAccount(context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	username := data["username"]
	userTypeId, _ := strconv.Atoi(data["userTypeId"])

	result := Requests.DeactivateAccount(username, userTypeId)

	return giveVoidOperationResponse(context, result)

}

func UpdateUserDetails(context *fiber.Ctx) error {

	token := analyzeToken(context)
	if token == nil {
		return nil
	}

	var data map[string]string
	if err := context.BodyParser(&data); err != nil {
		return err
	}

	oldUsername := data["oldUsername"]
	newUsername := data["newUsername"]
	userTypeId, _ := strconv.Atoi(data["userTypeId"])

	result := Requests.UpdateUserDetails(oldUsername, newUsername, userTypeId)

	return giveVoidOperationResponse(context, result)

}
