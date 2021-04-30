package Controllers

import (
	"API/Database/Requests"
	_ "API/Database/Requests"
	"API/Models"
	_ "API/Models"
	"API/WebServer"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	_ "github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func Start(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

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
		return giveJSONResponse(context, Models.Error{Message: WebServer.InvalidLoginError}, fiber.StatusNotFound)

	}

	//  password validation
	if  user.Password != password {
		return giveJSONResponse(context, Models.Error{Message: WebServer.InvalidLoginError}, fiber.StatusUnauthorized)
	}

	// token creation
	signedToken, err := WebServer.GetUserSignedToken(user.Username, user.Type)
	if err != nil{
		return giveJSONResponse(context, Models.Error{Message: WebServer.CouldNotLoginError}, fiber.StatusInternalServerError)
	}

	// returns user info
	user.Token = signedToken
	return giveJSONResponse(context, user, fiber.StatusOK)
}

func getUserInfo (context *fiber.Ctx) error {

	isValid, token := analyzeToken(context)

	if !isValid {
		return giveJSONResponse(context, Models.Error{Message: WebServer.InvalidTokenError}, fiber.StatusUnauthorized)
	}

	user := WebServer.GetUsernameFromToken(token)

	fmt.Println(user)
	
	dummyUser := Requests.GetClientProfileInfo(user)
	return giveJSONResponse(context, dummyUser, fiber.StatusOK)
}

func getActiveSchedule(context *fiber.Ctx) error {

	isValid, _ := analyzeToken(context)

	if !isValid {
		return giveJSONResponse(context, Models.Error{Message: WebServer.InvalidTokenError}, fiber.StatusUnauthorized)
	}

	dummySchedule := Requests.GetCurrentSessionSchedule()

	return giveJSONResponse(context, dummySchedule, fiber.StatusOK)

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

