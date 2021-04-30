package Controllers

import (
	"API/Database/Common"
	"API/Database/Requests"
	"API/Models"
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
	user, success := Requests.GetUserByUsername(username)

	// user existence validation
	if !success {
		return giveJSONResponse(context, Models.Error{Message: Common.InvalidLoginError}, fiber.StatusNotFound)

	}

	//  password validation
	if  user.Password != password {
		return giveJSONResponse(context, Models.Error{Message: Common.InvalidLoginError}, fiber.StatusUnauthorized)
	}

	// token creation
	signedToken, err := GetUserSignedToken(user.Username, user.Type)
	if err != nil{
		return giveJSONResponse(context, Models.Error{Message: Common.CouldNotLoginError}, fiber.StatusInternalServerError)
	}

	// returns user info
	user.Token = signedToken
	return giveJSONResponse(context, user, fiber.StatusOK)
}

func GetActiveSchedule(context *fiber.Ctx) error {

	token := analyzeToken(context)

	if token == nil {
		return nil
	}

	dummySchedule := Requests.GetCurrentSessionSchedule()

	return giveJSONResponse(context, dummySchedule, fiber.StatusOK)

}