package FilteredScheduleStrategy

import (
	"API/Database/Requests"
	"API/Models"
)

type FilterByDate struct{
}

func (strategy *FilterByDate) filter(parameter string) Models.Schedule {
	return Requests.GetSessionsByDate(parameter)
}
