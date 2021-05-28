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

func DeleteService(pName string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_InsertService '%s', '%d', %s;`, pName, pMaxSpaces, pCost)
	return VoidRequest(query)
}
