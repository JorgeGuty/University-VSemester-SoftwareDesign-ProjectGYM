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
	ID             int    `json:"id"`
	Username       string `json:"username"`
	Type           int    `json:"type"`
	Identification string `json:"identification"`
	Password       string `json:"-"`
	Token          string `json:"token"`
}
