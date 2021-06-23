package FilteredScheduleStrategy

import (
	"API/Database/Requests"
	"API/Models"
)

type FilterByServiceType struct{
}

func (strategy *FilterByServiceType) filter(parameter string) Models.Schedule {
	return Requests.GetSessionsByServiceType(parameter)
}

