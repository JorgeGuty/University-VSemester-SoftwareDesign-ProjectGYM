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
	"github.com/golang-sql/civil"
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
		return giveJSONResponse(context, Models.Error{Message: InvalidLoginError}, fiber.StatusNotFound)

	}

	//  password validation
	if  user.Password != password {
		return giveJSONResponse(context, Models.Error{Message: InvalidLoginError}, fiber.StatusUnauthorized)
	}

	// token creation
	signedToken, err := getUserSignedToken(user.Username, user.Type)
	if err != nil{
		return giveJSONResponse(context, Models.Error{Message: CouldNotLoginError}, fiber.StatusInternalServerError)
	}

	// returns user info
	user.Token = signedToken
	return giveJSONResponse(context, user, fiber.StatusOK)
}

func getUserInfo (context *fiber.Ctx) error {

	isValid, token := analyzeToken(context)

	if !isValid {
		return giveJSONResponse(context, Models.Error{Message: InvalidTokenError}, fiber.StatusUnauthorized)
	}

	user := getUsernameFromToken(token)
	userType := getUserTypeFromToken(token)

	fmt.Println(user)

	dummyUser := Models.ClientUser{
		ID:       10,
		Username: user,
		Type:     userType,
		Name:     "Elfu Lano",
		Email:    "e@e.com",
		Phone:    "70560910",
		Balance:  12345.0,
	}

	return giveJSONResponse(context, dummyUser, fiber.StatusOK)
}

func getActiveSchedule(context *fiber.Ctx) error {

	isValid, _ := analyzeToken(context)

	if !isValid {
		return giveJSONResponse(context, Models.Error{Message: InvalidTokenError}, fiber.StatusUnauthorized)
	}

	var dummySession1 = Models.Session{
		ID:                1,
		Name:              "Yoga con Juan",
		Date:              civil.DateTime{
			Date: civil.Date{
				Year:  2021,
				Month: 4,
				Day:   30,
			},
			Time: civil.Time{
				Hour:       15,
				Minute:     30,
				Second:     0,
				Nanosecond: 0,
			},
		},
		DurationMin:       120,
		AvailableSpaces:   15,
		Cost:              20000000,
		SessionInstructor: Models.Instructor{
			ID:             2,
			Name:           "Juan",
			Identification: "123123",
			Email:          "a@a",
			Type:           1,
		},
		SessionService:    Models.Service{
			ID:        1,
			Name:      "Yoga",
			MaxSpaces: 20,
		},
	}
	dummySession2 := Models.Session{
		ID:                1,
		Name:              "Yoga con Pedro",
		Date:              civil.DateTime{
			Date: civil.Date{
				Year:  2021,
				Month: 4,
				Day:   30,
			},
			Time: civil.Time{
				Hour:       15,
				Minute:     30,
				Second:     0,
				Nanosecond: 0,
			},
		},
		DurationMin:       120,
		AvailableSpaces:   15,
		Cost:              20000000,
		SessionInstructor: Models.Instructor{
			ID:             1,
			Name:           "Pedro",
			Identification: "222222",
			Email:          "p@a",
			Type:           2,
		},
		SessionService:    Models.Service{
			ID:        1,
			Name:      "Yoga",
			MaxSpaces: 20,
		},
	}
	dummySession3 := Models.Session{
		ID:                1,
		Name:              "Funcional con Fulano",
		Date:              civil.DateTime{
			Date: civil.Date{
				Year:  2021,
				Month: 4,
				Day:   30,
			},
			Time: civil.Time{
				Hour:       15,
				Minute:     30,
				Second:     0,
				Nanosecond: 0,
			},
		},
		DurationMin:       120,
		AvailableSpaces:   15,
		Cost:              20000000,
		SessionInstructor: Models.Instructor{
			ID:             3,
			Name:           "Fulano",
			Identification: "789789",
			Email:          "l@a",
			Type:           1,
		},
		SessionService:    Models.Service{
			ID:        2,
			Name:      "Funcional",
			MaxSpaces: 30,
		},
	}

	dummySchedule := Models.Schedule{Sessions: []Models.Session{dummySession1,dummySession2,dummySession3}}

	return giveJSONResponse(context, dummySchedule, fiber.StatusOK)

}

func analyzeToken(context *fiber.Ctx) (bool, *jwt.Token) {
	
	jwtFromHeader := string(context.Request().Header.Peek("Authorization"))
	isValid, token := validateUserToken(jwtFromHeader)

	return isValid, token
}

func giveJSONResponse(context *fiber.Ctx, pJSON interface{}, pStatus int) error {
	context.Status(pStatus)
	return context.JSON(pJSON)
}

