package Common

import mssql "github.com/denisenkom/go-mssqldb"

type VoidOperationResult struct {
	Success      bool               `json:"success"`
	ReturnStatus mssql.ReturnStatus `json:"return_code"`
	Message      string             `json:"message"`
}
