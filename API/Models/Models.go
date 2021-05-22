package Models

import (
	mssql "github.com/denisenkom/go-mssqldb"
	"github.com/golang-sql/civil"
)

type Error struct {
	Message string `json:"message"`
}

type VoidOperationResult struct {
	Success bool `json:"success"`
	ReturnStatus mssql.ReturnStatus `json:"return_code"`
	Message string `json:"message"`
}

type Gym struct {
	GymNumber       int    `json:"gym_number"`
	Capacity        int    `json:"capacity"`
	RegistrationFee int    `json:"registration_fee"`
	Name            string `json:"name"`
}

type Instructor struct {
	ID             int    `json:"id"`
	Name           string `json:"name"`
	Identification string `json:"identification"`
	Email          string `json:"email"`
	Type           string `json:"type"`
}

type Service struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	MaxSpaces int 	 `json:"max_spaces"`
	Cost	  string `json:"cost"`
}

type Session struct {
	ID                int        `json:"id"`
	Name              string     `json:"name"`
	Date              civil.Date `json:"date"`
	Time              civil.Time `json:"time"`
	DurationMin       int        `json:"duration_min"`
	AvailableSpaces   int        `json:"available_spaces"`
	Cost              string     `json:"cost"`
	IsCanceled        bool       `json:"IsCanceled"`
	SessionInstructor Instructor `json:"session_instructor"`
	SessionService    Service    `json:"session_service"`
}

type PreliminarySession struct {
	ID                int        `json:"id"`
	Name              string     `json:"name"`
	WeekDay           int		 `json:"week_day"`
	Time              civil.Time `json:"time"`
	DurationMin       int        `json:"duration_min"`
	AvailableSpaces   int        `json:"available_spaces"`
	Cost              string     `json:"cost"`
	SessionInstructor Instructor `json:"session_instructor"`
	SessionService    Service    `json:"session_service"`
}

type Schedule struct {
	Sessions []Session `json:"sessions"`
}

type PreliminarySchedule struct {
	Sessions []PreliminarySession `json:"preliminary_sessions"`
}

type Login struct {
	Identifier int    `json:"identifier"`
	Username   string `json:"username"`
	Type       int    `json:"type"`
	Password   string `json:"-"`
	Token      string `json:"token"`
}

type Client struct {
	MembershipNumber 	int 	`json:"membershipNumber"`
	Name           		string 	`json:"name"`
	Email          		string 	`json:"email"`
	Phone          		string 	`json:"phone"`
	Balance        		string 	`json:"balance"`
	Identification 		string 	`json:"identification"`
}

