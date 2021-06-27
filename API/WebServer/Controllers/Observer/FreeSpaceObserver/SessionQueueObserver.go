package FreeSpaceObserver

import (
	//"API/Database"
	"API/Models"
)

type SessionQueue struct {
	Queue []Models.Client `json:"Queue"`
}

func (sessionQueue *SessionQueue) update(sessionId int) {
	println("update")
}

func newSessionQueue() *SessionQueue {
	return &SessionQueue{
		Queue: make([]Models.Client, 0),
	}
}
