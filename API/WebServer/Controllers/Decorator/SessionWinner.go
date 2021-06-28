package Decorator

import "API/Database/Requests"

type SessionWinner struct {
	claimer          PrizeClaimer
	membershipNumber int
}

func (p *SessionWinner) AwardPrize() {
	Requests.AddPrizeToClient(p.membershipNumber, p.getPrizeNumber())
}

func (p *SessionWinner) getPrizeNumber() int {
	return 5
}
