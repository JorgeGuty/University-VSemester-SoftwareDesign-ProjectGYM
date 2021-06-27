package FreeSpaceObserver

type FreeSpaceNotifier struct {
	ObserverList []SessionObserver `json:"Observers"`
}

func (notifier *FreeSpaceNotifier) Register(o SessionObserver) {
	notifier.ObserverList = append(notifier.ObserverList, o)
}

func (notifier *FreeSpaceNotifier) NotifyAll(pDate string, pTime string, pRoom int) {
	println("Vamos a notificar")
	for _, sessionObserver := range notifier.ObserverList {

		sessionObserver.Update(pDate, pTime, pRoom)
	}
}

// func (notifier *FreeSpaceNotifier) Deregister(o sessionObserver) {
// 	notifier.ObserverList = RemoveFromslice(notifier.ObserverList, o)
// }

// // Funcion de Guru Refactoring Go Example
// func RemoveFromslice(observerList []sessionObserver, observerToRemove sessionObserver) []sessionObserver {
// 	observerListLength := len(observerList)
// 	for i, sessionObserver := range observerList {
// 		if observerToRemove.getID() == sessionObserver.getID() {
// 			observerList[observerListLength-1], observerList[i] = observerList[i], observerList[observerListLength-1]
// 			return observerList[:observerListLength-1]
// 		}
// 	}
// 	return observerList
// }
