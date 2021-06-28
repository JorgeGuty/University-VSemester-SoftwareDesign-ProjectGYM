package Decorator

import "API/Database/Requests"

type EvaluationWinner struct {
	claimer          PrizeClaimer
	membershipNumber int
	month            int
	year             int
}

func (p *EvaluationWinner) AwardPrize() {
	Requests.AddPrizeToClient(p.membershipNumber, p.getPrizeNumber(), p.month, p.year)
}

func (p *EvaluationWinner) getPrizeNumber() int {
	return 4
}
