package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func CancelSession(pSessionID int) Models.VoidOperationResult {
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

	schedule := Database.ParsePreliminarySchedule(resultSet)

	return schedule

}

func DeletePreliminarySession(pSessionID int) Models.VoidOperationResult {
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
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

	returnStatus, err := Database.VoidTransaction(query)

	if err != nil {
		return Models.VoidOperationResult{
			Success:      false,
			ReturnStatus: returnStatus,
			Message:      err.Error(),
		}
	}

	result := Database.ParseVoidResult(returnStatus)

	return result
}

func ConfirmPreliminarySchedule() Models.VoidOperationResult {
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}
	return dummyResult
}
