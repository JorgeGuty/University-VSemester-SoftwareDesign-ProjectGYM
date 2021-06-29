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

func GetSessionsByInstructor(pInstructorName string) Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_GetSessionsByInstructor '%s';`, pInstructorName)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}

func GetSessionsByServiceType(pServiceType string) Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_GetSessionsByServiceType '%s';`, pServiceType)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}

func GetSessionsByDate(pDate string) Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_GetSessionsByDate '%s';`, pDate)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}

func GetSessionsByTime(pTime string) Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_GetSessionsByTime '%s';`, pTime)

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

func ChangeSessionInstructor(pDate string, pRoomId int, pStartTime string, pInstructorNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_ChangeSessionInstructor '%d', '%s', '%s', %d;`, pInstructorNumber, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}


func MarkSessionAttendanceTaken(pDate string, pRoomId int, pStartTime string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_MarkSessionAttendanceTaken '%s', '%s', %d;`, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}

func MarkClientAttendance(pDate string, pRoomId int, pStartTime string, pMembershipId int) Common.VoidOperationResult {
	fmt.Println("Marca asistencia")
	query := fmt.Sprintf(`EXEC SP_MarkClientAttendance '%s', '%s', %d, %d;`, pDate, pStartTime, pRoomId, pMembershipId)
	return VoidRequest(query)
}

func GetAttendancePendingSessions() Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_GetAttendancePendingSessions;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}
