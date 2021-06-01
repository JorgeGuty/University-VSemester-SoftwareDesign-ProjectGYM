package Models

type Instructor struct {
	ID             int       `json:"id"`
	Name           string    `json:"name"`
	Identification string    `json:"identification"`
	Email          string    `json:"email"`
	Type           string    `json:"type"`
	Services       []Service `json:"services"`
}
