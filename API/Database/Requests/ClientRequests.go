package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
)

func GetClientProfileInfo(pMembershipNumber int) []Models.Client {

	query := fmt.Sprintf(`EXEC SP_GetClientProfileInfo %d;`, pMembershipNumber)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Client{}
	}

	client := ParseClients(resultSet)

	return client
}

func GetClients(pDebtorsFilter int) []Models.Client {

	query := fmt.Sprintf(`EXEC SP_GetClients %d;`, pDebtorsFilter)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		fmt.Println(err.Error())
		return []Models.Client{}
	}

	clients := ParseClients(resultSet)

	return clients

}

func CreateClient(pIdentification string, pName string, pEmail string, pPhone string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_CreateClient '%s','%s','%s','%s';`, pIdentification, pName, pEmail, pPhone)
	return VoidRequest(query)
}

func DeleteClient(pMembershipNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeleteClient %d;`, pMembershipNumber)
	return VoidRequest(query)
}

func UpdateClientDetail(pMembershipNumber int, pIdentification string, pName string, pEmail string, pPhone string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_UpdateClientDetails %d, '%s','%s','%s','%s';`, pMembershipNumber, pIdentification, pName, pEmail, pPhone)
	return VoidRequest(query)
}

func InsertCreditMovement(pMembershipNumber int, pAmount string, pSubject string, pPaymentMethodId int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_InsertCreditMovement %d, %s, '%s', %d;`, pMembershipNumber, pAmount, pSubject, pPaymentMethodId)
	return VoidRequest(query)
}

func GetPaymentMethods() []Models.PaymentMethod {

	query := fmt.Sprintf(`EXEC SP_GetPaymentMethods;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.PaymentMethod{}
	}

	paymentMethods := ParsePaymentMethods(resultSet)

	return paymentMethods
}

func GetSessionParticipants(pDate string, pRoomId int, pStartTime string) []Models.Client {

	query := fmt.Sprintf(`EXEC SP_GetSessionParticipants '%s', '%s', %d;`, pDate, pStartTime, pRoomId)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		fmt.Println(err.Error())
		return []Models.Client{}
	}

	clients := ParseClients(resultSet)

	return clients

}

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