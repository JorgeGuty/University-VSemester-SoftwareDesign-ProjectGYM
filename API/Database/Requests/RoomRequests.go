package Requests

import (
	"API/Database/Common"
	"fmt"
)

func SetRoomMaxSpace(pRoomNumber int, pMaxSpaces int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_SetRoomMaxSpace %d, %d;`, pRoomNumber, pMaxSpaces)
	return VoidRequest(query)
}

func SetRoomWorkingHours(pRoomNumber int, pWeekDay int, pOpeningTime string, pClosingTime string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_ChangeRoomWorkingHours %d, %d, '%s', '%s';`, pRoomNumber, pWeekDay, pOpeningTime, pClosingTime)
	return VoidRequest(query)
}
