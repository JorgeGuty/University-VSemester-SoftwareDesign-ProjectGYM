package FreeSpaceObserver

type Observable interface {
	NotifyAll()
	Register(Observer SessionObserver)
}
