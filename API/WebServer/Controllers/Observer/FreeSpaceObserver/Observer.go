package Observer

type observer interface {
	update(int)
	getID() int
}