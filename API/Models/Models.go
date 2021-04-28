package Models

import (
	"github.com/golang-sql/civil"
)

type Error struct {
	Message string `json:"message"`
}

type Gym struct {
	GymNumber		int		`json:"gym_number"`
	Capacity		int		`json:"capacity"`
	RegistrationFee	int		`json:"registration_fee"`
	Name 			string	`json:"name"`
}

type Instructor struct {
	ID				int		`json:"id"`
	Name 			string	`json:"name"`
	Identification 	string	`json:"identification"`
	Email 			string	`json:"email"`
	Type 			int		`json:"type"`
}

type Service struct {
	ID			int		`json:"id"`
	Name		string	`json:"name"`
	MaxSpaces	int		`json:"max_spaces"`
}

type Session struct {
	ID					int				`json:"id"`
	Name 				string 			`json:"name"`
	Date 				civil.DateTime 	`json:"date"`
	DurationMin 		int 			`json:"duration_min"`
	AvailableSpaces 	int 			`json:"available_spaces"`
	Cost 				int				`json:"cost"`
	SessionInstructor 	Instructor 		`json:"session_instructor"`
	SessionService 		Service 		`json:"session_service"`
}

type Schedule struct {
	Sessions []Session `json:"sessions"`
}

type User struct {
	ID			int		`json:"id"`
	Username 	string	`json:"username"`
	Type 		int		`json:"type"`
	Password 	string	`json:"-"`
	Token 		string	`json:"token"`
}


type ClientUser struct {
	ID			int		`json:"id"`
	Username 	string	`json:"username"`
	Name		string	`json:"name"`
	Email		string	`json:"email"`
	Phone		string	`json:"phone"`
	Balance		int		`json:"balance"`
}

type AdminUser struct {
	ID			int		`json:"id"`
	Username 	string	`json:"username"`
	Name		string	`json:"name"`
}

