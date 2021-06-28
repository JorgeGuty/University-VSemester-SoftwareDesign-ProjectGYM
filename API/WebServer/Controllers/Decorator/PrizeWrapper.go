package Decorator

type PrizeWrapper struct {
}

func (p *PrizeWrapper) GetPrizedClient(pMembershipNumber int, pStars int) PrizeClaimer {

	var prizedClient PrizeClaimer = &PrizedClient{
		Stars:            pStars,
		MembershipNumber: pMembershipNumber,
	}

	if pStars == p.getFirstStarMile() {
		prizedClient = &ItemWinner{
			claimer:          prizedClient,
			membershipNumber: pMembershipNumber,
		}
	}
	if pStars == p.getSecondStarMile() {
		prizedClient = &EvaluationWinner{
			claimer:          prizedClient,
			membershipNumber: pMembershipNumber,
		}
	}
	if pStars == p.getThirdStarMile() {
		prizedClient = &SessionWinner{
			claimer:          prizedClient,
			membershipNumber: pMembershipNumber,
		}
	}

	return prizedClient
}

// Deberia traerlos de la base
func (p *PrizeWrapper) getFirstStarMile() int {
	return 1
}

func (p *PrizeWrapper) getSecondStarMile() int {
	return 2
}

func (p *PrizeWrapper) getThirdStarMile() int {
	return 3
}
