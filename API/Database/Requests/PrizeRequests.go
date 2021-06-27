package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetMonthlyPrizes(pMonth int, pYear int) []Models.Prize {

	query := fmt.Sprintf(`EXEC SP_GetClientPrizes %d, %d;`, pMonth, pYear)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Prize{}
	}

	prizes := ParsePrizes(resultSet)

	return prizes

}