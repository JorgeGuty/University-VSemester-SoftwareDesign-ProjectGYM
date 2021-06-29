package Decorator

import "API/Database/Requests"

type EvaluationWinner struct {
	WinnerDecorator
}

func (p *EvaluationWinner) AwardPrize() {
	p.claimer.AwardPrize()
	Requests.AddPrizeToClient(p.membershipNumber, p.getPrizeNumber(), p.month, p.year)
}

func (p *EvaluationWinner) getPrizeNumber() int {
	return 4
}
