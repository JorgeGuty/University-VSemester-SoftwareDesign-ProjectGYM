package Decorator

import "API/Database/Requests"

type EvaluationWinner struct {
	claimer          PrizeClaimer
	membershipNumber int
}

func (p *EvaluationWinner) AwardPrize() {
	Requests.AddPrizeToClient(p.membershipNumber, p.getPrizeNumber())
}

func (p *EvaluationWinner) getPrizeNumber() int {
	return 4
}
