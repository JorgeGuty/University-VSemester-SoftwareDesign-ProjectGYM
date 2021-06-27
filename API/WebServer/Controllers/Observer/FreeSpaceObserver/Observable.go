package Observer

type Observable interface {
	notifyAll()
	register(Observer observer)
}
