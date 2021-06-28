package Decorator

type PrizedClient struct {
	MembershipNumber int
	Stars            int
	claim            PrizeClaimer
}

func (p *PrizedClient) AwardPrize() {
	p.claim.AwardPrize()
}
