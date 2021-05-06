package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
	"log"
)

func GetUserByUsername(pUsername string) (Models.Login, bool) {

	query := fmt.Sprintf(`EXEC SP_GetUserByUsername '%v';`, pUsername)

	resultSet, returnStatus, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Login{}, false
	}

	if !resultSet.Next() {
		return Models.Login{}, false
	}

	log.Printf("status=%d", returnStatus)

	user := Database.ParseUserWithPassword(resultSet)

	return user, true
}

func GetCurrentSessionSchedule() Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_getCurrentCalendar;`)

	resultSet, _,  err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := Database.ParseSchedule(resultSet)

	return schedule
}

func TestRequest() bool {
	query := fmt.Sprintf(`EXEC test;`)

	good, err := Database.TestTran(query)

	if err != nil {
		return false
	}

	return good
}
