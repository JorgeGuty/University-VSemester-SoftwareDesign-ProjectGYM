package Decorator

import (
	"API/Database/Requests"
	"math/rand"
)

type ItemWinner struct {
	claimer          PrizeClaimer
	membershipNumber int
	month            int
	year             int
}

func (p *ItemWinner) AwardPrize() {
	Requests.AddPrizeToClient(p.membershipNumber, p.getPrizeNumber(), p.month, p.year)
}

func (p *ItemWinner) getPrizeNumber() int {
	//Opciones que deberia traerse de la base
	options := []int{1, 2, 3}

	return options[rand.Intn(len(options))]
}
