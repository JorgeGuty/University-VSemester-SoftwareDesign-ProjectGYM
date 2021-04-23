package WebServer

import (
	"API/Database/Requests"
	_ "API/Database/Requests"
	_ "API/Models"
	"fmt"
	_ "github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func Start(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func Login(context *fiber.Ctx) error {

	var data map[string]string

	if err := context.BodyParser(&data); err != nil {
		return err
	}

	username := data["username"]
	password := data["password"]

	 user, success := Requests.GetUserByUsername(username)
	//user , success := Models.User{ID: 1, Username: username, Password: password, Type: 1,Token: "HolaMundo"} , true

	if !success {

		context.Status(fiber.StatusNotFound)
		return context.JSON(fiber.Map{"message":"user not found"})

	}

	if  user.Password != password {

		context.Status(fiber.StatusUnauthorized)
		fmt.Println(password+user.Password)
		return context.JSON(fiber.Map{"message":"incorrect password"})
	}

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
