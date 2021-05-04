package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetUserByUsername(pUsername string) (Models.Login, bool) {

	query := fmt.Sprintf(`EXEC SP_GetUserByUsername '%v';`, pUsername)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Login{}, false
	}

	if !resultSet.Next() {
		return Models.Login{}, false
	}

	user := Database.ParseUserWithPassword(resultSet)

	return user, true
}

func GetCurrentSessionSchedule() Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_getCurrentCalendar;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := Database.ParseSchedule(resultSet)

	return schedule
}
