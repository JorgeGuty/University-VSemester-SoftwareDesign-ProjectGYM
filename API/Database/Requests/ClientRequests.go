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

func GetReservedSessions(pMembershipNumber int) Models.Schedule {

	query := fmt.Sprintf(`EXEC SP_getBookings %d;`, pMembershipNumber)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}

func RegisterClientUser(pUsername string, pPassword string, pMembershipNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_RegisterClientUser '%s', '%s', %d;`, pUsername, pPassword, pMembershipNumber)
	return VoidRequest(query)
}
