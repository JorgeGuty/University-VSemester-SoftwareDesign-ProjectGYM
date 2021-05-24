package Models

type Client struct {
	MembershipNumber int    `json:"membershipNumber"`
	Name             string `json:"name"`
	Email            string `json:"email"`
	Phone            string `json:"phone"`
	Balance          string `json:"balance"`
	Identification   string `json:"identification"`
}
