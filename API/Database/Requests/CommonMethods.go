package Requests

import (
	"API/Database"
	"API/Database/Common"
	"fmt"

	mssql "github.com/denisenkom/go-mssqldb"
)

func ErrorExecutingTransaction() Common.VoidOperationResult {
	return Common.VoidOperationResult{
		Success:      false,
		ReturnStatus: 0,
		Message:      Common.ErrorExecutingTransaction,
	}
}

func VoidRequest(pQuery string) Common.VoidOperationResult {

	returnStatus, err := Database.VoidTransaction(pQuery)

	if err != nil {
		return ErrorExecutingTransaction()
	}

	var result Common.VoidOperationResult

	if returnStatus < Common.MinimalSuccessfulReturnCode {
		result = GetError(returnStatus)
	} else {
		result = ParseSuccessfulResult(returnStatus)
	}

	return result
}

func GetError(pErrorCode mssql.ReturnStatus) Common.VoidOperationResult {

	query := fmt.Sprintf(`EXEC SP_GetErrorByCode %d`, pErrorCode)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return ErrorExecutingTransaction()
	}

	errorResult := ParseErrorResult(resultSet)

	return errorResult

}
