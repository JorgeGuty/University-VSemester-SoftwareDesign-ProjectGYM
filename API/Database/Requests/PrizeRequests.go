package Requests

import (
	"API/Database"
	"API/Database/Common"
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

func GetStarredClients(pMonth int, pYear int) []Models.StarredClient {

	query := fmt.Sprintf(`EXEC SP_GetStarredClients %d, %d;`, pYear, pMonth)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.StarredClient{}
	}

	prizes := ParseStarredClients(resultSet)

	return prizes

}

func AddPrizeToClient(pMembershipNumber int, pPrizeNumber int, pMonth int, pYear int) Common.VoidOperationResult {

	query := fmt.Sprintf(`EXEC SP_InsertPrize %d, %d, %d, %d;`, pMembershipNumber, pPrizeNumber, pMonth, pYear)

	return VoidRequest(query)

}
