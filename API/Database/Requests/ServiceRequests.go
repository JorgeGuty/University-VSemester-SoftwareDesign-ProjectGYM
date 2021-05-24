package Requests

import (
	"API/Database"
	"API/Models"
	"fmt"
)

func GetServices() []Models.Service {

	query := fmt.Sprintf(`EXEC SP_GetServices;`)

	resultSet, err := Database.ReadTransaction(query)

	if err != nil {
		return []Models.Service{}
	}

	services := ParseServices(resultSet)

	return services

}
