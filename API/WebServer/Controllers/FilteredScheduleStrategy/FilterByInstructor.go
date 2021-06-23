package FilteredScheduleStrategy

import (
	"API/Database/Requests"
	"API/Models"
)

type FilterByInstructor struct{
}

func (strategy *FilterByInstructor) filter(parameter string) Models.Schedule {
	return Requests.GetSessionsByInstructor(parameter)
}

