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

func InsertPreliminarySession(pSessionID int) Models.VoidOperationResult {
	// TODO: add real session parameters
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}

func ConfirmPreliminarySchedule() Models.VoidOperationResult {
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}
