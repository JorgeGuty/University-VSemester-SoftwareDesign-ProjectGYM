package FreeSpaceObserver

type FreeSpaceNotifier struct {
	ObserverList []observer `json:"Observers"`
}

func (notifier *FreeSpaceNotifier) Register(o observer) {
	notifier.ObserverList = append(notifier.ObserverList, o)
}

func (notifier *FreeSpaceNotifier) Deregister(o observer) {
	notifier.ObserverList = RemoveFromslice(notifier.ObserverList, o)
}

// Funcion de Guru Refactoring Go Example
func RemoveFromslice(observerList []observer, observerToRemove observer) []observer {
	observerListLength := len(observerList)
	for i, observer := range observerList {
		if observerToRemove.getID() == observer.getID() {
			observerList[observerListLength-1], observerList[i] = observerList[i], observerList[observerListLength-1]
			return observerList[:observerListLength-1]
		}
	}
	return observerList
}

func (notifier *FreeSpaceNotifier) NotifyAll() {
	for _, observer := range notifier.ObserverList {
		observer.update(observer.getID())
	}
}
