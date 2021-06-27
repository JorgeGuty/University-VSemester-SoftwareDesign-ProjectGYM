package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
)

func GetNotifications(pMembershipNumber int) []Models.Notification {

	query := fmt.Sprintf(`EXEC SP_GetNotifications %d;`, pMembershipNumber)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		fmt.Println(err.Error())
		return []Models.Notification{}
	}

	notifications := ParseNotifications(resultSet)

	return notifications

}

func InsertNotification(pMembershipNumber int, pMessage string) Common.VoidOperationResult {

	query := fmt.Sprintf(`EXEC SP_InsertNotification %d, '%s';`, pMembershipNumber, pMessage)

	return VoidRequest(query)

}
