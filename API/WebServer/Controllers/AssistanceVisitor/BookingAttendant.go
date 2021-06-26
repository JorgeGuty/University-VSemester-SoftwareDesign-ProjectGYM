package AssistanceVisitor

type BookingAttendant struct {
	ClientMembershipNumber int
}
func (bookingAttendant *BookingAttendant) initClient(pMembershipNumber int){
	bookingAttendant.ClientMembershipNumber = pMembershipNumber
}

func (bookingAttendant *BookingAttendant) accept(visitor Visitor){
	visitor.VisitAttendant(bookingAttendant)
}
