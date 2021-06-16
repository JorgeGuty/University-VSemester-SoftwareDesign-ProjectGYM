package Models

import "github.com/golang-sql/civil"

type PreliminarySession struct {
	ID                int        `json:"id"`
	Name              string     `json:"name"`
	WeekDay           int        `json:"week_day"`
	Time              civil.Time `json:"time"`
	DurationMin       int        `json:"duration_min"`
	AvailableSpaces   int        `json:"available_spaces"`
	Cost              string     `json:"cost"`
	SessionInstructor Instructor `json:"session_instructor"`
	SessionService    Service    `json:"session_service"`
}

type PreliminarySchedule struct {
	Sessions []PreliminarySession `json:"preliminary_sessions"`
}
