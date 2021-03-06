package FreeSpaceObserver

import (
	"API/Database/Requests"
	"strconv"
)

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
				// TODO: Poner nombre de la sesión
				message := "You were automatically booked to session you were queue. Session is placed in room:" + strconv.Itoa(pRoom) + "  the next: " + pDate + " at: " + pTime
				Requests.InsertNotification(membershipNumber, message)
			}
		}
	}

}

func (sessionQueue *SessionQueue) Add(pMembershipNumber int) {
	sessionQueue.Queue = append(sessionQueue.Queue, pMembershipNumber)
}
