package FilteredScheduleStrategy

import "API/Models"

type filterStrategy interface {
	filter(parameter string) Models.Schedule
}