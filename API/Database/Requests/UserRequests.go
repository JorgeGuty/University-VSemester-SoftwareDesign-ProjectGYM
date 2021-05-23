package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetUser(pUsername string) (Models.Login, bool) {

	query := fmt.Sprintf(`EXEC SP_GetUserByUsername '%s';`, pUsername)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Login{}, false
	}

	user := ParseLoginResponse(resultSet)
	return user, true
}
