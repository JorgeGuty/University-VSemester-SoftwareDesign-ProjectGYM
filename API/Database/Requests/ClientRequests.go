package Requests

import (
	"API/Database"
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

func GetReservedSessions(pIdentification string) Models.Schedule {

	query := fmt.Sprintf(`EXEC SP_getBookings '%s';`, pIdentification)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Schedule{}
	}

	schedule := ParseSchedule(resultSet)

	return schedule
}
