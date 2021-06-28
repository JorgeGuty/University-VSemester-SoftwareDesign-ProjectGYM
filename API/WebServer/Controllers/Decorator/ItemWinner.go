package Decorator

type ItemWinner struct {
	claimer PrizeClaimer
}

func (p *ItemWinner) AwardPrize() {
	// TODO:
}