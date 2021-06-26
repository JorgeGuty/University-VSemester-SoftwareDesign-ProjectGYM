package AssistanceVisitor

import (
	"API/Database/Requests"
)

type AssistanceVisitor struct {
	StartTime string
	Date      string
	RoomId    int
}

func (assistanceVisitor *AssistanceVisitor) VisitAttendant(bookingAttendant *BookingAttendant){
	Requests.MarkClientAttendance(assistanceVisitor.Date, assistanceVisitor.RoomId, assistanceVisitor.StartTime, bookingAttendant.ClientMembershipNumber)
}