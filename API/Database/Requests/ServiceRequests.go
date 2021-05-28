package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
)

func GetServices() []Models.Service {

	query := fmt.Sprintf(`EXEC SP_GetServices;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Service{}
	}

	services := ParseServices(resultSet)

	return services

}

func InsertService(pName string, pMaxSpaces int, pCost string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_InsertService '%s', '%d', %s;`, pName, pMaxSpaces, pCost)
	return VoidRequest(query)
}

func DeleteService(pServiceNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeleteService %d;`, pServiceNumber)
	println(query)
	return VoidRequest(query)
}

func SetServiceMaxSpace(pServiceNumber int, pMaxSpaces int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_SetServiceMaxSpace %d, %d;`, pServiceNumber, pMaxSpaces)
	println(query)
	return VoidRequest(query)
}
