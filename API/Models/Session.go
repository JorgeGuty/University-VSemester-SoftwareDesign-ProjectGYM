package Models

import "github.com/golang-sql/civil"

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

type Schedule struct {
	Sessions []Session `json:"sessions"`
}

// ? Se podría agregar cómo metodo un set que transforme de Time a civil.Date
