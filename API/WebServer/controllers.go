package WebServer

import (
	"API/Database/Requests"
	_ "API/Database/Requests"
	"API/Models"
	_ "API/Models"
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
		context.Status(fiber.StatusNotFound)
		return context.JSON(fiber.Map{"message":"user not found"})

	}

	//  password validation
	if  user.Password != password {
		context.Status(fiber.StatusUnauthorized)
		fmt.Println(password+user.Password)
		return context.JSON(fiber.Map{"message":"incorrect password"})
	}

	// token creation
	signedToken, err := getUserSignedToken(user.Username, user.Type)
	if err != nil{
		context.Status(fiber.StatusInternalServerError)
		return context.JSON(fiber.Map{"message": "could not login"})
	}

	user.Token = signedToken
	return context.JSON(user)
}

func TokenTest (context *fiber.Ctx) error {

	jwtFromHeader := string(context.Request().Header.Peek("Authorization"))

	isValid, token := validateUserToken(jwtFromHeader)

	if isValid {
		return context.JSON(token.Claims)
	} else {
		context.Status(fiber.StatusUnauthorized)
		return context.JSON(fiber.Map{
			"success":"false",
			"message":"invalid token",
		})
	}

}

func getUserInfo (context *fiber.Ctx) error {

	isValid, token := AnalyzeToken(context)

	if !isValid {
		return context.JSON(fiber.Map{
			"success":"false",
			"message":"invalid token",
		})
	}

	user := getUsernameFromToken(token)
	userType := getUserTypeFromToken(token)

	fmt.Println(user)

	return context.JSON(Models.ClientUser{
		ID:       10,
		Username: user,
		Type:     userType,
		Name:     "Elfu Lano",
		Email:    "e@e.com",
		Phone:    "70560910",
		Balance:  12345.0,
	})

}


func AnalyzeToken (context *fiber.Ctx) (bool, *jwt.Token) {
	
	jwtFromHeader := string(context.Request().Header.Peek("Authorization"))
	isValid, token := validateUserToken(jwtFromHeader)
	fmt.Println("isValid: ")
	fmt.Println(isValid)

	return isValid, token
}

func GiveJSONResponse(context *fiber.Ctx, pJSON string, pStatus int) error {
	context.Status(pStatus)
	return context.JSON(pJSON)
}

