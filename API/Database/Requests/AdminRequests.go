package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
)

func CancelSession(pDate string, pRoomId int, pStartTime string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_CancelSession '%s', '%s', %d;`, pDate, pStartTime, pRoomId)
	return VoidRequest(query)
}

func GetPreliminarySchedule(pMonth int, pYear int) Models.PreliminarySchedule {

	query := fmt.Sprintf(`EXEC SP_GetPreliminarySchedule %d, %d;`, pMonth, pYear)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.PreliminarySchedule{}
	}

	schedule := ParsePreliminarySchedule(resultSet)

	return schedule

}

func DeletePreliminarySession(pYear int, pMonth int, pWeekDay int, pRoomId int, pStartTime string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeletePreliminarySession %d, %d, %d, %d, '%s'`, pYear, pMonth, pWeekDay, pRoomId, pStartTime)
	return VoidRequest(query)
}

func InsertPreliminarySession(pName string,
	pWeekDay int,
	pMonth int,
	pYear int,
	pStartTime string,
	pDurationMins int,
	pService string,
	pInstructorNumber int,
	pRoomId int,
) Common.VoidOperationResult {

	query := fmt.Sprintf(`EXEC SP_InsertPreliminarySession '%s', %d, %d, %d,'%s', %d, '%s', '%d',%d;`,
		pName,
		pWeekDay,
		pMonth,
		pYear,
		pStartTime,
		pDurationMins,
		pService,
		pInstructorNumber,
		pRoomId,
	)

	return VoidRequest(query)
}

func ConfirmPreliminarySchedule(pMonth int, pYear int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_ConfirmPreliminarySchedule %d, %d`, pMonth, pYear)
	return VoidRequest(query)
}

func DeleteInstructor(pInstructorNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeleteInstructor '%d' ;`, pInstructorNumber)
	return VoidRequest(query)
}
