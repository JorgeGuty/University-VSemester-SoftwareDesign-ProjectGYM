package Models

type Service struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	MaxSpaces int    `json:"max_spaces"`
	Cost      string `json:"cost"`
}
