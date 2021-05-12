package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
	mssql "github.com/denisenkom/go-mssqldb"
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

	user := ParseUserWithPassword(resultSet)

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

func GetError(pErrorCode mssql.ReturnStatus) Models.VoidOperationResult {

	query := fmt.Sprintf(`EXEC SP_GetErrorByCode %d`, pErrorCode)

	resultSet, err := Database.ReadTransaction(query)


	if err != nil {
		return Models.VoidOperationResult{
			Success:      false,
			ReturnStatus: 0,
			Message:      Common.ErrorExecutingTransaction,
		}
	}

	errorResult := ParseErrorResult(resultSet)

	return errorResult

}

func TestRequest() bool {
	return true
}


func VoidRequest(pQuery string) Models.VoidOperationResult {
	returnStatus, err := Database.VoidTransaction(pQuery)

	if err != nil {
		return Models.VoidOperationResult{
			Success:      false,
			ReturnStatus: returnStatus,
			Message:      err.Error(),
		}
	}

	result := ParseVoidResult(returnStatus)

	return result
}