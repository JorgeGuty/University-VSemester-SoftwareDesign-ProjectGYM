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
	"time"
)

type customClaims struct {
	Username 	string `json:"username"`
	Type		int		`json:"type"`
	jwt.StandardClaims
}

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

	claims := &jwt.StandardClaims{
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		Issuer:    "test",
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(SecretKey))
	if err != nil{
		context.Status(fiber.StatusInternalServerError)
		return context.JSON(fiber.Map{"message": "could not login"})
	}

	// Before late night fix
	// return context.JSON(token)

	user.Token = signedToken
	return context.JSON(user)
}

func TokenTest (context *fiber.Ctx) error {

	jwtFromHeader := string(context.Request().Header.Peek("Authorization"))

	token, err := jwt.Parse(jwtFromHeader, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if token.Valid {
		return context.JSON(Models.ClientUser{
			ID:       1,
			Username: "usuario1",
			Type:     2,
			Name:     "fulano",
			Email:    "f@gmail.com",
			Phone:    "70560910",
			Balance:  842344,
		})
	} else if ve, ok := err.(*jwt.ValidationError); ok {
		if ve.Errors&jwt.ValidationErrorMalformed != 0 {
			context.Status(fiber.StatusNotFound)
			return context.JSON(fiber.Map{"message":"invalid token structure"})
		} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
			context.Status(fiber.StatusUnauthorized)
			return context.JSON(fiber.Map{"message":"invalid token structure"})
		} else {
			context.Status(fiber.StatusInternalServerError)
			return context.JSON(fiber.Map{"message": "could not handle token"})
		}
	} else {
		context.Status(fiber.StatusInternalServerError)
		return context.JSON(fiber.Map{"message": "could not handle token"})
	}
}
