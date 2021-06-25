package AssistanceVisitor

type Visitor interface {
	VisitAttendant(client *BookingAttendant)
}