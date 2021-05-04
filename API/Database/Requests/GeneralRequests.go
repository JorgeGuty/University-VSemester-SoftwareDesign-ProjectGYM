package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetUserByUsername(pUsername string) (Models.Login, bool) {

	query := fmt.Sprintf(`EXEC SP_GetUserByUsername '%v';`, pUsername)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Login{}, false
	}

	if !resultSet.Next() {
		return Models.Login{}, false
	}

	user := Database.ParseUserWithPassword(resultSet)

	return user, true
}

func GetCurrentSessionSchedule() Models.Schedule {
	query := fmt.Sprintf(`EXEC SP_getCurrentCalendar;`)

	resultSet, err := Database.ReadTransaction(query)

<<<<<<< HEAD
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
	dummySession2 := Models.Session{
		ID:                2,
		Name:              "Yoga con Pedro",
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
		DurationMin:       60,
		AvailableSpaces:   15,
		Cost:              "20000000",
		SessionInstructor: Models.Instructor{
			ID:             1,
			Name:           "Pedro",
			Identification: "222222",
			Email:          "p@a",
			Type:           2,
		},
		SessionService:    Models.Service{
			ID:        1,
			Name:      "Yoga",
			MaxSpaces: 20,
		},
	}
	dummySession3 := Models.Session{
		ID:                3,
		Name:              "Funcional con Fulano",
		Date: civil.Date{
			Year:  2021,
			Month: 5,
			Day:   1,
		},
		Time: civil.Time{
			Hour:       11,
			Minute:     30,
			Second:     0,
			Nanosecond: 0,
		},
		DurationMin:       120,
		AvailableSpaces:   15,
		Cost:              "20000000",
		SessionInstructor: Models.Instructor{
			ID:             3,
			Name:           "Fulano",
			Identification: "789789",
			Email:          "l@a",
			Type:           1,
		},
		SessionService:    Models.Service{
			ID:        2,
			Name:      "Funcional",
			MaxSpaces: 30,
		},
=======
	if err != nil {
		return Models.Schedule{}
>>>>>>> dev
	}

	schedule := Database.ParseSchedule(resultSet)

	return schedule
}
