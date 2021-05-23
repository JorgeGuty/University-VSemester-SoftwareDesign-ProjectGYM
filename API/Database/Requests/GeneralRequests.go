package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetLogin(pUsername string) (Models.Login, bool) {

	query := fmt.Sprintf(`EXEC SP_GetUserByUsername '%s';`, pUsername)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Login{}, false
	}

	user := ParseLoginResponse(resultSet)
	return user, true
}

func GetCurrentSessionSchedule() Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_getCurrentCalendar;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}

func GetInstructors(pFilterByService int, pService string, pFilterByType int, pType string) []Models.Instructor {

	query := fmt.Sprintf(`EXEC SP_GetInstructors %d, '%s', %d, '%s';`, pFilterByType, pType, pFilterByService, pService)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		fmt.Println(err.Error())
		return []Models.Instructor{}
	}

	instructors := ParseInstructors(resultSet)

	return instructors

}

func GetServices() []Models.Service {

	query := fmt.Sprintf(`EXEC SP_GetServices;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Service{}
	}

	services := ParseServices(resultSet)

	return services

}

func BookSession(pClientNumber int, pDate string, pRoomId int, pStartTime string) Models.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_BookSession '%d', '%s', '%s', %d;`, pClientNumber, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}

func CancelBooking(pClientNumber int, pDate string, pRoomId int, pStartTime string) Models.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_CancelBooking '%d', '%s', '%s', %d;`, pClientNumber, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}

func DeactivateAccount(pUsername string, pUserTypeID int) Models.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeactivateAccount '%s', %d;`, pUsername, pUserTypeID)
	return VoidRequest(query)
}

func UpdateUserDetails(pOldUsername string, pNewUsername string, pUserTypeID int) Models.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_UpdateUserDetails '%s', '%s', %d;`, pOldUsername, pNewUsername, pUserTypeID)
	return VoidRequest(query)
}

func TestRequest() bool {
	return true
}
