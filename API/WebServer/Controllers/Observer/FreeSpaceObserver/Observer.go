package FreeSpaceObserver

type observer interface {
	update(int)
	getID() int
}