package Requests

import (
	"API/Models"

	"github.com/golang-sql/civil"
)

func CancelSession(pSessionID int) Models.VoidOperationResult {
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}

func GetPreliminarySchedule() Models.Schedule {

	// TODO: real db request

	dummySession1 := Models.Session{
		ID:   1,
		Name: "Yoga con Juan",
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
		DurationMin:     120,
		AvailableSpaces: 15,
		Cost:            "20000000",
		SessionInstructor: Models.Instructor{
			ID:             2,
			Name:           "Juan",
			Identification: "123123",
			Email:          "a@a",
			Type:           "Planta",
		},
		SessionService: Models.Service{
<<<<<<< HEAD
			ID:        1,
			Name:      "Yoga",
=======
			ID:   1,
			Name: "Yoga",
>>>>>>> dev
		},
	}
	dummySession2 := Models.Session{
		ID:   1,
		Name: "Yoga con Pedro",
		Date: civil.Date{
			Year:  2021,
			Month: 4,
			Day:   30,
		},
		Time: civil.Time{
			Hour:       13,
			Minute:     30,
			Second:     0,
			Nanosecond: 0,
		},
		DurationMin:     60,
		AvailableSpaces: 15,
		Cost:            "20000000",
		SessionInstructor: Models.Instructor{
			ID:             1,
			Name:           "Pedro",
			Identification: "222222",
			Email:          "p@a",
			Type:           "De afuera",
		},
		SessionService: Models.Service{
<<<<<<< HEAD
			ID:        1,
			Name:      "Yoga",
=======
			ID:   1,
			Name: "Yoga",
>>>>>>> dev
		},
	}
	dummySession3 := Models.Session{
		ID:   1,
		Name: "Funcional con Fulano",
		Date: civil.Date{
			Year:  2021,
			Month: 4,
			Day:   30,
		},
		Time: civil.Time{
			Hour:       11,
			Minute:     30,
			Second:     0,
			Nanosecond: 0,
		},
		DurationMin:     120,
		AvailableSpaces: 15,
		Cost:            "20000000",
		SessionInstructor: Models.Instructor{
			ID:             3,
			Name:           "Fulano",
			Identification: "789789",
			Email:          "l@a",
			Type:           "Planta",
		},
		SessionService: Models.Service{
<<<<<<< HEAD
			ID:        2,
			Name:      "Funcional",
=======
			ID:   2,
			Name: "Funcional",
>>>>>>> dev
		},
	}

	dummySchedule := Models.Schedule{Sessions: []Models.Session{dummySession1, dummySession2, dummySession3}}

	return dummySchedule
}

func DeletePreliminarySession(pSessionID int) Models.VoidOperationResult {
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}

func InsertPreliminarySession(pSessionID int) Models.VoidOperationResult {
	// TODO: add real session parameters
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}

func ConfirmPreliminarySchedule() Models.VoidOperationResult {
	// TODO: real db request

	dummyResult := Models.VoidOperationResult{Success: true}

	return dummyResult
}
