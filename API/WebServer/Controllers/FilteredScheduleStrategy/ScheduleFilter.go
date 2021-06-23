package FilteredScheduleStrategy

import "API/Models"

type ScheduleFilter struct {
	strategy FilterStrategy
}

func (scheduleFilter *ScheduleFilter) SetFilterStrategy(pStrategy FilterStrategy) {
	scheduleFilter.strategy = pStrategy
}

func (scheduleFilter *ScheduleFilter) Filter(pParameter string) Models.Schedule{
	return scheduleFilter.strategy.filter(pParameter)
}