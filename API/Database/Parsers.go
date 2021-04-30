package Database

import (
	"API/Models"
	"database/sql"
)

func ParseUserWithPassword(resultSet *sql.Rows) Models.Login {

	var id int
	var username string
	var password string
	var userType int

	if err := resultSet.Scan(&id, &username, &password, &userType); err != nil{
		return Models.Login{}
	}

	user := Models.Login{
		ID:       id,
		Username: username,
		Type:     userType,
		Password: password,
	}

	return user
}

func ParseSession(resultSet *sql.Rows) Models.Session{
	return Models.Session{}
}
