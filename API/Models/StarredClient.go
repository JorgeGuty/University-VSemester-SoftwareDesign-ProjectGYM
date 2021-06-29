package Models

type StarredClient struct {
	Client `json:"client"`
	Stars  int `json:"stars"`
}
