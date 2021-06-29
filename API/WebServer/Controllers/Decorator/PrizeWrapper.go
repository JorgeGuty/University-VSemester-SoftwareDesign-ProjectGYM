package Decorator

type PrizeWrapper struct {
}

func (p *PrizeWrapper) GetPrizedClient(pMembershipNumber int, pStars int, pMonth int, pYear int) PrizeClaimer {

	var prizedClient PrizeClaimer = &PrizedClient{
		Stars:            pStars,
		MembershipNumber: pMembershipNumber,
	}

	info := WinnerDecorator{
		membershipNumber: pMembershipNumber,
		month:            pMonth,
		year:             pYear,
	}

	if pStars >= p.getFirstStarMile() {
		info.claimer = prizedClient
		prizedClient = &ItemWinner{
			WinnerDecorator: info,
		}
	}
	if pStars >= p.getSecondStarMile() {
		info.claimer = prizedClient
		prizedClient = &EvaluationWinner{
			WinnerDecorator: info,
		}
	}
	if pStars >= p.getThirdStarMile() {
		info.claimer = prizedClient
		prizedClient = &SessionWinner{
			WinnerDecorator: info,
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
