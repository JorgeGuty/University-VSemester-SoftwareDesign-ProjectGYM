package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
	mssql "github.com/denisenkom/go-mssqldb"
)

func ErrorExecutingTransaction() Models.VoidOperationResult {
	return Models.VoidOperationResult{
		Success:      false,
		ReturnStatus: 0,
		Message:      Common.ErrorExecutingTransaction,
	}
}

func VoidRequest(pQuery string) Models.VoidOperationResult {

	returnStatus, err := Database.VoidTransaction(pQuery)

	if err != nil {
		return ErrorExecutingTransaction()
	}

	var result Models.VoidOperationResult

	if returnStatus < Common.MinimalSuccessfulReturnCode {
		result = GetError(returnStatus)
	} else  {
		result = ParseSuccessfulResult(returnStatus)
	}

	return result
}

func GetError(pErrorCode mssql.ReturnStatus) Models.VoidOperationResult {

	query := fmt.Sprintf(`EXEC SP_GetErrorByCode %d`, pErrorCode)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return ErrorExecutingTransaction()
	}

	errorResult := ParseErrorResult(resultSet)

	return errorResult

}