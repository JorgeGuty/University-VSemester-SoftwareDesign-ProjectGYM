package Requests

import (
	"API/Database/Common"
	"API/Models"
	"database/sql"
	"fmt"
	"time"

	mssql "github.com/denisenkom/go-mssqldb"

	"github.com/golang-sql/civil"
)

func ParseLoginResponse(resultSet *sql.Rows) Models.Login {

	var id int
	var username string
	var password string
	var userType int

	if !resultSet.Next() {
		return Models.Login{}
	}

	if err := resultSet.Scan(&id, &username, &password, &userType); err != nil {
		fmt.Println(err.Error())

		return Models.Login{}
	}

	user := Models.Login{
		Identifier: id,
		Username:   username,
		Type:       userType,
		Password:   password,
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
			&session.SessionService.Name,
			&session.SessionService.Cost,
			&session.SessionService.MaxSpaces,
		)

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

func ParseInstructors(resultSet *sql.Rows) []Models.Instructor {

	var instructors []Models.Instructor

	for resultSet.Next() {
		newInstructor := Models.Instructor{}

		err := resultSet.Scan(
			&newInstructor.ID,
			&newInstructor.Name,
			&newInstructor.Email,
			&newInstructor.Identification,
			&newInstructor.Type,
		)

		if err != nil {
			println(err.Error())
			return []Models.Instructor{}
		}

		instructors = append(instructors, newInstructor)
	}

	return instructors
}

func ParseInstructor(resultSet *sql.Rows) Models.Instructor {

	instructor := Models.Instructor{}
	if !resultSet.Next() {
		return Models.Instructor{}
	}

	err := resultSet.Scan(
		&instructor.ID,
		&instructor.Name,
		&instructor.Email,
		&instructor.Identification,
		&instructor.Type,
	)

	if err != nil {
		println(err.Error())
		return Models.Instructor{}
	}

	return instructor
}

func ParseServices(resultSet *sql.Rows) []Models.Service {
	var services []Models.Service

	for resultSet.Next() {
		newService := Models.Service{}

		err := resultSet.Scan(
			&newService.ID,
			&newService.Name,
			&newService.MaxSpaces,
			&newService.Cost,
		)

		if err != nil {
			println(err.Error())
			return []Models.Service{}
		}

		services = append(services, newService)
	}

	return services
}

func ParsePreliminarySchedule(resultSet *sql.Rows) Models.PreliminarySchedule {

	var preliminarySchedule Models.PreliminarySchedule

	for resultSet.Next() {
		newSession := Models.PreliminarySession{}

		var preliminarySessionTime time.Time

		err := resultSet.Scan(
			&newSession.ID,
			&newSession.WeekDay,
			&newSession.AvailableSpaces,
			&preliminarySessionTime,
			&newSession.Name,
			&newSession.DurationMin,
			&newSession.SessionService.ID,
			&newSession.SessionService.Cost,
			&newSession.SessionService.Name,
			&newSession.SessionService.MaxSpaces,
			&newSession.SessionInstructor.ID,
			&newSession.SessionInstructor.Name,
			&newSession.SessionInstructor.Identification,
			&newSession.SessionInstructor.Email,
			&newSession.SessionInstructor.Type,
		)

		if err != nil {
			println(err.Error())
			return Models.PreliminarySchedule{}
		}

		newSession.Time = civil.Time{
			Hour:       preliminarySessionTime.Hour(),
			Minute:     preliminarySessionTime.Minute(),
			Second:     preliminarySessionTime.Second(),
			Nanosecond: preliminarySessionTime.Nanosecond(),
		}

		preliminarySchedule.Sessions = append(preliminarySchedule.Sessions, newSession)
	}
	return preliminarySchedule
}

func ParseSuccessfulResult(pReturnStatus mssql.ReturnStatus) Common.VoidOperationResult {

	voidOperationResult := Common.VoidOperationResult{
		Success:      true,
		ReturnStatus: pReturnStatus,
		Message:      "Operation performed with success.",
	}

	return voidOperationResult

}

func ParseErrorResult(resultSet *sql.Rows) Common.VoidOperationResult {

	var errorName string
	var errorCode mssql.ReturnStatus
	var errorMessage string

	if !resultSet.Next() {
		errorName = Common.UnknownErrorName
		errorCode = Common.UnknownErrorCode
		errorMessage = Common.UnknownErrorMessage

	} else if err := resultSet.Scan(&errorName, &errorCode, &errorMessage); err != nil {
		fmt.Println(err.Error())
		return Common.VoidOperationResult{}

	}

	errorResult := Common.VoidOperationResult{
		Success:      false,
		ReturnStatus: errorCode,
		Message:      errorName + ": " + errorMessage,
	}

	return errorResult

}

func ParseClients(resultSet *sql.Rows) []Models.Client {
	var clients []Models.Client

	for resultSet.Next() {
		newCLient := Models.Client{}

		err := resultSet.Scan(
			&newCLient.MembershipNumber,
			&newCLient.Name,
			&newCLient.Email,
			&newCLient.Phone,
			&newCLient.Identification,
			&newCLient.Balance,
		)

		if err != nil {
			println(err.Error())
			return []Models.Client{}
		}

		clients = append(clients, newCLient)
	}

	return clients
}

func ParsePaymentMethods(resultSet *sql.Rows) []Models.PaymentMethod {
	var paymentMethods []Models.PaymentMethod

	for resultSet.Next() {
		newPaymentMethod := Models.PaymentMethod{}

		err := resultSet.Scan(
			&newPaymentMethod.ID,
			&newPaymentMethod.Name,
		)

		if err != nil {
			println(err.Error())
			return []Models.PaymentMethod{}
		}

		paymentMethods = append(paymentMethods, newPaymentMethod)
	}

	return paymentMethods
}
