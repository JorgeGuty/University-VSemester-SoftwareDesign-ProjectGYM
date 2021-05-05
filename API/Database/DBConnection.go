package Database

import (
	"context"
	"database/sql"
	"fmt"
	mssql "github.com/denisenkom/go-mssqldb"
	_ "github.com/denisenkom/go-mssqldb"
	"log"
)

var db *sql.DB

var server = "carrera.database.windows.net"
var port = 1433
var user = "trabajadorResponsable"
var password = "1231!#ASDF!a"
var database = "PlusGymProject"


func connect(){


	// Build connection string
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
		server, user, password, port, database)

	var err error

	// Create connection pool
	db, err = sql.Open("sqlserver", connString)

	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}
	ctx := context.Background()
	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Printf("Connected!\n")
}

func ReadTransaction(pQuery string) (*sql.Rows, mssql.ReturnStatus, error){

	connect()
	defer db.Close()



	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, 0, err
	}
	var returnStatus mssql.ReturnStatus
	// Execute query
	rows, err := db.QueryContext(ctx, pQuery, &returnStatus)
	if err != nil {
		return nil, returnStatus, err
	}
	fmt.Println(returnStatus == 0)
	return rows, returnStatus, nil
}
