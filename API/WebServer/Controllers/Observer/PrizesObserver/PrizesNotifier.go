package PrizesObserver


type PrizesNotifier struct {
	Observers []Observer
}

func (notifier *PrizesNotifier) Register(observer Observer) {
	notifier.Observers = append(notifier.Observers, observer)
}

func (notifier *PrizesNotifier) Reset() {
	notifier.Observers = []Observer{}
}

func (notifier *PrizesNotifier) NotifyAll() {
	for _, observer := range notifier.Observers {
		observer.update()
	}
}