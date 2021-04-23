package WebServer

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"time"
)

type UserClaims struct {
	Username 	string `json:"username"`
	Type		int		`json:"type"`
	jwt.StandardClaims
}

const SecretKey = "secret"

func getUserSignedToken(pUsername string, pType int) (string, error) {


	claims := UserClaims{
		pUsername,
		pType,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			Issuer:    "PlusGym",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(SecretKey))
	if err != nil{
		return "", err
	}

	return signedToken, nil

}


func validateUserToken (signedToken string) (bool, *jwt.Token) {
	token, err := jwt.ParseWithClaims(signedToken, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if claims, ok := token.Claims.(*UserClaims); ok && token.Valid {
		fmt.Printf("%v %v", claims.Username, claims.StandardClaims.ExpiresAt)
		return true, token
	} else {
		fmt.Println(err)
		return false, nil
	}

}
