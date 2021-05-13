package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetClientProfileInfo(pUsername string) Models.ClientUser {

	// TODO: real db request
	dummyUser := Models.ClientUser{
		ID:             10,
		Username:       pUsername,
		Name:           "Elfu Lano",
		Email:          "e@e.com",
		Phone:          "70560910",
		Balance:        "12345.0",
		Identification: "123456",
	}

	return dummyUser

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
