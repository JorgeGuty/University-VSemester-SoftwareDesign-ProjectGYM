package AssistanceVisitor

type VisitableElement interface {
	accept(visitor Visitor)
}
