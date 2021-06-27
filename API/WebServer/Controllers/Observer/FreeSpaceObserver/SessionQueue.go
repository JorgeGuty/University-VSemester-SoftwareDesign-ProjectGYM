package FreeSpaceObserver

import "API/Database/Requests"

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
		if len(sessionQueue.Queue) > 0 {
			membershipNumber := sessionQueue.Queue[0]
			result := Requests.BookSession(membershipNumber, pDate, pRoom, pTime)
			if result.Success {
				// TODO: Poner los tres datos y agregar nombre de la session
				Requests.InsertNotification(membershipNumber, "You were automatically booked to session you were queue. Session starts"+pTime)
			}
		}
	}

}

func (sessionQueue *SessionQueue) Add(pMembershipNumber int) {
	sessionQueue.Queue = append(sessionQueue.Queue, pMembershipNumber)
}
