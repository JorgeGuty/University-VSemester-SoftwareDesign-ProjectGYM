package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetUserByUsername(pUsername string) (Models.User, bool) {

	query := fmt.Sprintf(`EXEC SP_GetUserByUsername '%v';`, pUsername)

	result, err := Database.ReadTransaction(query)

	if err != nil{
		return Models.User{}, false
	}

	var id int
	var username string
	var password string
	var userType int

	if !result.Next(){
		return Models.User{}, false
	}

	if err := result.Scan(&id, &username, &password, &userType); err != nil{
		return Models.User{}, false
	}

	user := Models.User{
		ID:       id,
		Username: username,
		Type:     userType,
		Password: password,
	}

	return user, true
}

func GetCurrentSessionSchedule() Models.Schedule{
	return Models.Schedule{}
}
