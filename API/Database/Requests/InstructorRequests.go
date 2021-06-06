package Requests

import (
	"API/Database"
	"API/Database/Common"
	"API/Models"
	"fmt"
)

func GetInstructors(pFilterByService int, pService string, pFilterByType int, pType string) []Models.Instructor {

	query := fmt.Sprintf(`EXEC SP_GetInstructors %d, '%s', %d, '%s';`, pFilterByType, pType, pFilterByService, pService)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		fmt.Println(err.Error())
		return []Models.Instructor{}
	}

	instructors := ParseInstructors(resultSet)

	return instructors

}

func DeleteInstructor(pInstructorNumber int) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_DeleteInstructor '%d' ;`, pInstructorNumber)
	return VoidRequest(query)
}

func InsertInstructor(pName string, pIdentification string, pEmail string, pType string) Common.VoidOperationResult {
	query := fmt.Sprintf(`EXEC SP_InsertInstructor '%s','%s','%s','%s' ;`, pName, pIdentification, pEmail, pType)
	return VoidRequest(query)
}

func GetInstructorInfo(pInstructorNumber int) Models.Instructor {

	query := fmt.Sprintf(`EXEC SP_GetInstructorInfo %d;`, pInstructorNumber)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return Models.Instructor{}
	}

	instructor := ParseInstructor(resultSet)

	return instructor
}
