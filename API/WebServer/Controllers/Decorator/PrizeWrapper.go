package Decorator

// Deberia traerlos de la base
const firstStarMile = 1
const secondStarMile = 2
const thirdStarMile = 3

type PrizeWrapper struct {
}

func (p *PrizeWrapper) GetPrizedClient(pMembershipNumber int, pStars int) PrizeClaimer {

	var prizedClient PrizeClaimer = &PrizedClient{
		Stars:            pStars,
		MembershipNumber: pMembershipNumber,
	}

	if pStars == firstStarMile {
		prizedClient = &ItemWinner{
			claimer: prizedClient,
		}
	}
	if pStars == secondStarMile {
		prizedClient = &EvaluationWinner{
			claimer: prizedClient,
		}
	}
	if pStars == thirdStarMile {
		prizedClient = &SessionWinner{
			claimer: prizedClient,
		}
	}

	return prizedClient
}
