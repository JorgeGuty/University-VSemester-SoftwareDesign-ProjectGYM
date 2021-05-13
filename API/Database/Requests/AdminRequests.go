package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func CancelSession(pDate string, pRoomId  int, pHour string) Models.VoidOperationResult {
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}

func GetPreliminarySchedule(pMonth int, pYear int) Models.PreliminarySchedule {

	query := fmt.Sprintf(`EXEC SP_GetPreliminarySchedule %d, %d;`, pMonth, pYear)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.PreliminarySchedule {}
	}

	schedule := ParsePreliminarySchedule(resultSet)

	return schedule

}

func DeletePreliminarySession(pYear int, pMonth int, pWeekDay int, pRoomId int, pStartTime string) Models.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeletePreliminarySession %d, %d, %d, %d, '%s'`, pYear, pMonth, pWeekDay, pRoomId, pStartTime)
	return VoidRequest(query)
}

func InsertPreliminarySession(	pName string,
								pWeekDay int,
								pMonth int,
								pYear int,
								pStartTime string,
								pDurationMins int,
								pService string,
								pInstructorIdentification string,
								pRoomId int,
							 ) 	Models.VoidOperationResult {

	query := fmt.Sprintf(`EXEC SP_InsertPreliminarySession '%s', %d, %d, %d,'%s', %d, '%s', '%s',%d;`,
		pName,
		pWeekDay,
		pMonth,
		pYear,
		pStartTime,
		pDurationMins,
		pService,
		pInstructorIdentification,
		pRoomId,
	)

	return VoidRequest(query)
}

func ConfirmPreliminarySchedule(pMonth int, pYear int) Models.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_ConfirmPreliminarySchedule %d, %d`, pMonth, pYear)
	return VoidRequest(query)
}
