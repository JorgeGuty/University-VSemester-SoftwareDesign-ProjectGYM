package Models

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

type Sesion struct {

}

type Schedule struct {

}

type User struct {
	ID			int		`json:"id"`
	Username 	string	`json:"username"`
	Type 		int		`json:"type"`
	Password 	string	`json:"-"`
	Token 		string	`json:"token"`
}
