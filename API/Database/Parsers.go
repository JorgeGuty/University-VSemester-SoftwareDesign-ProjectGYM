package Database

import (
	"API/Models"
	"database/sql"
	"time"

	"github.com/golang-sql/civil"
)

func ParseUserWithPassword(resultSet *sql.Rows) Models.Login {

	var id int
	var username string
	var password string
	var userType int

	if err := resultSet.Scan(&id, &username, &password, &userType); err != nil {
		return Models.Login{}
	}

	user := Models.Login{
		ID:       id,
		Username: username,
		Type:     userType,
		Password: password,
	}

	return user
}

func ParseSession(resultSet *sql.Rows) Models.Session {
	return Models.Session{}
}

func ParseSchedule(resultSet *sql.Rows) Models.Schedule {

	var session Models.Session
	var err error
	var sessionList []Models.Session

	var date time.Time
	var time time.Time

	for resultSet.Next() {
		session = Models.Session{}

		err = resultSet.Scan(
			&session.ID,
			&session.Name,
			&date,
			&time,
			&session.DurationMin,
			&session.AvailableSpaces,
			&session.Cost,
			&session.IsCanceled,
			&session.SessionInstructor.Name,
			&session.SessionInstructor.Identification,
			&session.SessionInstructor.Email,
			&session.SessionInstructor.Type,

			&session.SessionService.Name)

		if err != nil {
			println(err.Error())
			return Models.Schedule{}
		}
		session.Date = civil.Date{
			Year:  date.Year(),
			Month: date.Month(),
			Day:   date.Day(),
		}
		session.Time = civil.Time{
			Hour:       time.Hour(),
			Minute:     time.Minute(),
			Second:     time.Second(),
			Nanosecond: time.Nanosecond(),
		}

		sessionList = append(sessionList, session)
	}
	schedule := Models.Schedule{}
	schedule.Sessions = sessionList

	return schedule
}
