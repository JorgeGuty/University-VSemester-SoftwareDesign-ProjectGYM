package Models

type StarredClient struct {
	Client Client `json:"client"`
	Stars  int    `json:"stars"`
}
