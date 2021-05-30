package Requests

import (
	"API/Database/Common"
	"fmt"
)

func SetRoomMaxSpace(pRoomNumber int, pMaxSpaces int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_SetRoomMaxSpace %d, %d;`, pRoomNumber, pMaxSpaces)
	return VoidRequest(query)
}
