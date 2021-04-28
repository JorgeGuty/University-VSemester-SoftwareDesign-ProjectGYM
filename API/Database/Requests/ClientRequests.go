package Requests

import "API/Models"

func GetClientProfileInfo(pUsername string) Models.ClientUser {

	dummyUser := Models.ClientUser{
		ID:       10,
		Username: pUsername,
		Name:     "Elfu Lano",
		Email:    "e@e.com",
		Phone:    "70560910",
		Balance:  12345.0,
	}

	return dummyUser

}
