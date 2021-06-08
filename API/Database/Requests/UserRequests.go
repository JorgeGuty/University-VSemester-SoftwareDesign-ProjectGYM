package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
)

func GetLogin(pUsername string) (Models.Login, bool) {

	query := fmt.Sprintf(`EXEC SP_GetUserByUsername '%s';`, pUsername)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Login{}, false
	}

	user := ParseLoginResponse(resultSet)
	return user, true
}

func DeactivateAccount(pUsername string, pUserTypeID int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeactivateAccount '%s', %d;`, pUsername, pUserTypeID)
	return VoidRequest(query)
}

func UpdateUserDetails(pOldUsername string, pNewUsername string, pUserTypeID int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_UpdateUserDetails '%s', '%s', %d;`, pOldUsername, pNewUsername, pUserTypeID)
	return VoidRequest(query)
}

func RegisterClientUser(pUsername string, pPassword string, pMembershipNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_RegisterClientUser '%s', '%s', %d;`, pUsername, pPassword, pMembershipNumber)
	return VoidRequest(query)
}
