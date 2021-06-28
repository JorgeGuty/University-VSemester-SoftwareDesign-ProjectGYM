package Decorator

import "API/Database/Requests"

type SessionWinner struct {
	WinnerDecorator
}

func (p *SessionWinner) AwardPrize() {
	p.claimer.AwardPrize()
	Requests.AddPrizeToClient(p.membershipNumber, p.getPrizeNumber(), p.month, p.year)
}

func (p *SessionWinner) getPrizeNumber() int {
	return 5
}
