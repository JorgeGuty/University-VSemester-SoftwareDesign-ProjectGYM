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
	return VoidRequest(query)
}

func SetServiceMaxSpace(pServiceNumber int, pMaxSpaces int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_SetServiceMaxSpace %d, %d;`, pServiceNumber, pMaxSpaces)
	return VoidRequest(query)
}

func GetInstructorServices(pInstructorNumber int) []Models.Service {

	query := fmt.Sprintf(`EXEC SP_GetInstructorServices %d;`, pInstructorNumber)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Service{}
	}
	services := ParseServices(resultSet)

	return services
}

func GetFavoriteServices(pMembershipNumber int) []Models.Service {

	query := fmt.Sprintf(`EXEC SP_GetFavoriteServices %d;`, pMembershipNumber)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Service{}
	}

	services := ParseServices(resultSet)

	return services

}

func AddFavoriteService(pMembershipNumber int, pServiceNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_AddFavoriteService %d, %d;`, pMembershipNumber, pServiceNumber)
	return VoidRequest(query)
}

func RemoveFavoriteService(pMembershipNumber int, pServiceNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_RemoveFavoriteService %d, %d;`, pMembershipNumber, pServiceNumber)
	return VoidRequest(query)
}
