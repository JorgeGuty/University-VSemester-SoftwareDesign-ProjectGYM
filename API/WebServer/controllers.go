package WebServer

import (
	"API/Database/Requests"
	"API/Models"
	_ "API/Models"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	_ "github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"strconv"
	"time"
)

const SecretKey = "secret"

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

	if !success {

		context.Status(fiber.StatusNotFound)
		return context.JSON(fiber.Map{"message":"user not found"})

	}

	if  user.Password != password {

		context.Status(fiber.StatusUnauthorized)
		fmt.Println(password+user.Password)
		return context.JSON(fiber.Map{"message":"incorrect password"})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: strconv.Itoa(user.ID),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil{
		context.Status(fiber.StatusInternalServerError)
		return context.JSON(fiber.Map{"message": "could not login"})
	}

	// Before late night fix
	// return context.JSON(token)

	user.Token = token
	return context.JSON(user)
}


func TokenTest (context *fiber.Ctx) error {

	if token := context.Request().Header.Peek("Authorization"); token != nil{
		fmt.Println(token)
		return context.JSON(Models.ClientUser{
			ID:       1,
			Username: "usuario1",
			Type:     2,
			Name:     "fulano",
			Email:    "f@gmail.com",
			Phone:    "70560910",
			Balance:  842344,
		})
	}

	context.Status(fiber.StatusUnauthorized)
	return context.JSON(fiber.Map{"message": "unauthorized"})
}
