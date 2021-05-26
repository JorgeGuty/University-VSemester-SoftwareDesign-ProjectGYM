package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
)

func GetCurrentSessionSchedule() Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_GetCurrentCalendar;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}

func GetReservedSessions(pMembershipNumber int) Models.Schedule {

	query := fmt.Sprintf(`EXEC SP_GetBookings %d;`, pMembershipNumber)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}

func BookSession(pClientNumber int, pDate string, pRoomId int, pStartTime string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_BookSession '%d', '%s', '%s', %d;`, pClientNumber, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}

func CancelBooking(pClientNumber int, pDate string, pRoomId int, pStartTime string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_CancelBooking '%d', '%s', '%s', %d;`, pClientNumber, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}

func CancelSession(pDate string, pRoomId int, pStartTime string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_CancelSession '%s', '%s', %d;`, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}
