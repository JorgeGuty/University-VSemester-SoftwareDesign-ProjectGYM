package FilteredScheduleStrategy

import "API/Models"

type FilterStrategy interface {
	filter(parameter string) Models.Schedule
}