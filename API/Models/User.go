package Models

const (
	UsernameJsonTag = "username"
	PasswordJsonTag = "password"
)

// ! Version sin Id
type User struct {
	Username       string `json:"username"`
	Type           int    `json:"type"`
	Password       string `json:"-"`
	Token          string `json:"token"`
	Identification string `json:"identification"`
}

type Login struct {
	Identifier int    `json:"identifier"`
	Username   string `json:"username"`
	Type       int    `json:"type"`
	Password   string `json:"-"`
	Token      string `json:"token"`
}
