package PrizesObserver

import "API/Database/Requests"

type ClientPrize struct {
	PrizeName		string 	`json:"prize_name"`
	NeededStars		int 	`json:"needed_stars"`
	ClientName		string 	`json:"client_name"`
	MembershipId	int		`json:"membership_id"`
}

func (clientPrize *ClientPrize) update(){
	Requests.InsertNotification(clientPrize.MembershipId, "Usted se ha ganado un premio: "+clientPrize.PrizeName)
}
