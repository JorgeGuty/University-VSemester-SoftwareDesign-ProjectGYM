package Database

import (
	"API/Models"
	"database/sql"
)

func ParseUserWithPassword(resultSet  *sql.Rows) Models.UserWithPassword {

	var id int
	var username string
	var password string
	var userType int



	if err := resultSet.Scan(&id, &username, &password, &userType); err != nil{
		return Models.UserWithPassword{}
	}

	user := Models.UserWithPassword{
		ID:       id,
		Username: username,
		Type:     userType,
		Password: password,
	}

	return user

}
