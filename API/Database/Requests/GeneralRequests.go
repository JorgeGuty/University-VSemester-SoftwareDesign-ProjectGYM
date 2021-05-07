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

func GetInstructors(pFilterByService int, pService string, pFilterByType int, pType string) []Models.Instructor {

	query := fmt.Sprintf(`EXEC SP_GetInstructors %d, '%s', %d, '%s';`, pFilterByType, pType, pFilterByService, pService)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Instructor{}
	}

	instructors := Database.ParseInstructors(resultSet)

	return instructors

}

func GetServices() []Models.Service {

	query := fmt.Sprintf(`EXEC SP_GetServices;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Service{}
	}

	services := Database.ParseServices(resultSet)

	return services

}

func TestRequest() bool {

	return true
}
