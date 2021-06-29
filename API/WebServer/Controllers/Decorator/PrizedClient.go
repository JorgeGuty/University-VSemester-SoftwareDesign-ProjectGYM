package Decorator

type PrizedClient struct {
	MembershipNumber int
	Stars            int
}

func (p *PrizedClient) AwardPrize() {}
