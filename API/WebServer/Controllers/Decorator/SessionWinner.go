package Decorator

type SessionWinner struct {
	claimer PrizeClaimer
}

func (p *SessionWinner) AwardPrize() {
	// TODO:
}