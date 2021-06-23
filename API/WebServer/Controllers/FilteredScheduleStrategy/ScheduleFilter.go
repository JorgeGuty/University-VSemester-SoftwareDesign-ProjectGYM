package FilteredScheduleStrategy

type ScheduleFilter struct {
	strategy FilterStrategy
}

func (scheduleFilter *ScheduleFilter) setFilterStrategy(pStrategy FilterStrategy) {
	scheduleFilter.strategy = pStrategy
}