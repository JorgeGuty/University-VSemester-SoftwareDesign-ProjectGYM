package Models

type Login struct {
	Identifier int    `json:"identifier"`
	Username   string `json:"username"`
	Type       int    `json:"type"`
	Password   string `json:"-"`
	Token      string `json:"token"`
}
