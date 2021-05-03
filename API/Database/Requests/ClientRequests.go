package Requests

import (
	"API/Models"
	"github.com/golang-sql/civil"
)

func GetClientProfileInfo(pUsername string) Models.ClientUser {

	// TODO: real db request
	dummyUser := Models.ClientUser{
		ID:      		10,
		Username: 		pUsername,
		Name:     		"Elfu Lano",
		Email:    		"e@e.com",
		Phone:    		"70560910",
		Balance:  		"12345.0",
		Identification: "123456",
	}

	return dummyUser

}

func GetReservedSessions() Models.Schedule {

	// TODO: real db request

	dummySession1 := Models.Session{
		ID:                1,
		Name:              "Yoga con Juan",
		Date: civil.Date{
			Year:  2021,
			Month: 4,
			Day:   30,
		},
		Time: civil.Time{
			Hour:       15,
			Minute:     30,
			Second:     0,
			Nanosecond: 0,
		},
		DurationMin:       120,
		AvailableSpaces:   15,
		Cost:              "20000000",
		SessionInstructor: Models.Instructor{
			ID:             2,
			Name:           "Juan",
			Identification: "123123",
			Email:          "a@a",
			Type:           1,
		},
		SessionService:    Models.Service{
			ID:        1,
			Name:      "Yoga",
			MaxSpaces: 20,
		},
	}

	dummySchedule := Models.Schedule{Sessions: []Models.Session{dummySession1}}

	return dummySchedule
}

func BookSession(pUsername string, pSessionID int) Models.VoidOperationResult {

	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}

func CancelBookedSession(pUsername string, pSessionID int) Models.VoidOperationResult {

	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}
