package PrizesObserver

import "API/Database/Requests"

type ClientPrizeObserver struct {
	PrizeName		string 	`json:"prize_name"`
	MembershipId	int		`json:"membership_id"`
}

func (clientPrize *ClientPrizeObserver) update(){
	Requests.InsertNotification(clientPrize.MembershipId, "Usted se ha ganado un premio: "+clientPrize.PrizeName)
}
