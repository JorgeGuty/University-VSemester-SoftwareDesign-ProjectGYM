package Models

type Prize struct {
	PrizeName		string 	`json:"prize_name"`
	NeededStars		int		`json:"needed_stars"`
	ClientName		string	`json:"client_name"`
	MembershipId	int		`json:"membership_id"`
}
