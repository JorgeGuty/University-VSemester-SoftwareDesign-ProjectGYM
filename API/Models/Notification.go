package Models

import "github.com/golang-sql/civil"

type Notification struct {
	ID      int        `json:"id"`
	Message string     `json:"message"`
	Date    civil.Date `json:"date"`
	Time    civil.Time `json:"time"`
}
