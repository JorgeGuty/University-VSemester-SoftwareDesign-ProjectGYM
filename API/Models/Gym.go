package Models

type Gym struct {
	GymNumber       int    `json:"gym_number"`
	Capacity        int    `json:"capacity"`
	RegistrationFee int    `json:"registration_fee"`
	Name            string `json:"name"`
}
