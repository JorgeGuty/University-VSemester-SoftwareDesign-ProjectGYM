package Decorator

import "API/Database/Requests"

type SessionWinner struct {
	claimer          PrizeClaimer
	membershipNumber int
	month			 int
	year			 int
}

func (p *SessionWinner) AwardPrize() {
	Requests.AddPrizeToClient(p.membershipNumber, p.getPrizeNumber(),p.month, p.year)
}

func (p *SessionWinner) getPrizeNumber() int {
	return 5
}
