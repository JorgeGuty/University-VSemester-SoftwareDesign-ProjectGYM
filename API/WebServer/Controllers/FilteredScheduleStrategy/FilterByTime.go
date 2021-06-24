package FilteredScheduleStrategy

import (
	"API/Database/Requests"
	"API/Models"
)

type FilterByTime struct{
}

func (strategy *FilterByTime) filter(parameter string) Models.Schedule {
	return Requests.GetSessionsByTime(parameter)
}

