package Models

type Error struct {
	Message string `json:"message"`
}

type Client struct {
	Name	string
	Email	string
	Phone	string
	Balance	int
}

type Administrator struct {

}

type Instructor struct {

}

type Session struct {

}

type Schedule struct {
	Sessions []Session `json:"sessions"`
}

type User struct {
	ID			int		`json:"id"`
	Username 	string	`json:"username"`
	Type 		int		`json:"type"`
	Password 	string	`json:"-"`
	Token 		string	`json:"token"`
}


type ClientUser struct {
	ID             int    `json:"id"`
	Username       string `json:"username"`
	Type           int    `json:"type"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	Phone          string `json:"phone"`
	Balance        int    `json:"balance"`
	Identification int	  `json:"identification"`
}
