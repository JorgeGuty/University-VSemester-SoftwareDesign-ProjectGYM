package FreeSpaceObserver

type SessionQueue struct {
	SessionTime string `json:"SessionTime"`
	SessionDate string `json:"SessionDate"`
	SessionRoom int    `json:"SessionRoom"`
	Queue       []int  `json:"Queue"`
}

// * Constructor *
func NewSessionQueue(pDate string, pTime string, pRoom int) *SessionQueue {
	return &SessionQueue{
		Queue:       make([]int, 0),
		SessionTime: pTime,
		SessionDate: pDate,
		SessionRoom: pRoom,
	}
}

func (sessionQueue *SessionQueue) Update(pDate string, pTime string, pRoom int) {
	equalDate := pDate == sessionQueue.SessionDate
	equalTime := pTime == sessionQueue.SessionTime
	equalRoom := pRoom == sessionQueue.SessionRoom

	if equalDate && equalTime && equalRoom {
		// TODO: Request de insertar reserva con el primero en la cola
		println(sessionQueue.SessionTime + "updated")
	}

}

func (sessionQueue *SessionQueue) Add(pMembershipNumber int) {
	sessionQueue.Queue = append(sessionQueue.Queue, pMembershipNumber)
	println(sessionQueue.Queue)
}
