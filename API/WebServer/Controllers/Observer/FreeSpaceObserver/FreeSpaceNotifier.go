package FreeSpaceObserver

type FreeSpaceNotifier struct {
	ObserverList []SessionObserver `json:"Observers"`
}

func (notifier *FreeSpaceNotifier) Register(o SessionObserver) {
	notifier.ObserverList = append(notifier.ObserverList, o)
}

func (notifier *FreeSpaceNotifier) NotifyAll(pDate string, pTime string, pRoom int) {
	for _, sessionObserver := range notifier.ObserverList {
		sessionObserver.Update(pDate, pTime, pRoom)
	}
}
