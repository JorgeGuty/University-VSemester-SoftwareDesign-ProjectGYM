package PrizesObserver


type PrizesNotifier struct {
	Observers []Observer
}

func (notifier *PrizesNotifier) register(observer Observer) {
	notifier.Observers = append(notifier.Observers, observer)
}

func (notifier *PrizesNotifier) reset() {
	notifier.Observers = []Observer{}
}

func (notifier *PrizesNotifier) notifyAll() {
	for _, observer := range notifier.Observers {
		observer.update()
	}
}