package Models

// Observer
type observer interface {
	update(int)
	getID() int
}

type SessionQueue struct {
	Queue []Client `json:"Queue"`
}

func (sessionQueue *SessionQueue) update(sessionId int) {
	println("update")
}

func newSessionQueue() *SessionQueue {
	return &SessionQueue{
		Queue: make([]Client, 0),
	}
}

// Observable
type subject interface {
	notifyAll()
    register(Observer observer)
    deregister(Observer observer)
}

type FreeSpaceNotifier struct {
	observerList  []observer `json:"Observers"`
}

func (notifier *FreeSpaceNotifier) register(o observer) {
    notifier.observerList = append(i.observerList, o)
}

func (notifier *FreeSpaceNotifier) deregister(o observer) {
    notifier.observerList = removeFromslice(i.observerList, o)
}

// Funcion de Guru Refactoring Go Example
func removeFromslice(observerList []observer, observerToRemove observer) []observer {
    observerListLength := len(observerList)
    for i, observer := range observerList {
        if observerToRemove.getID() == observer.getID() {
            observerList[observerListLength-1], observerList[i] = observerList[i], observerList[observerListLength-1]
            return observerList[:observerListLength-1]
        }
    }
    return observerList
}

func (notifier *FreeSpaceNotifier) notifyAll() {
    for _, observer := range notifier.observerList {
        observer.update(observer.getID())
    }
}



