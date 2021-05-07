package Database

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	mssql "github.com/denisenkom/go-mssqldb"
)

var db *sql.DB

var server = "carrera.database.windows.net"
var port = 1433
var user = "trabajadorResponsable"
var password = "1231!#ASDF!a"
var database = "PlusGymProject"

func connect() {
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

func ReadTransaction(pQuery string) (*sql.Rows, error) {

	connect()
	defer db.Close()

	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, pQuery)
	if err != nil {
		return nil, err
	}

	return rows, nil
}

func VoidTransaction(pQuery string) (mssql.ReturnStatus, error) {

	connect()
	defer db.Close()

	fmt.Println("ejecutó el método de la llamada")

	ctx := context.Background()

	var returnStatus mssql.ReturnStatus

	// Check if database is alive.
	err := db.PingContext(ctx)

	if err != nil {
		returnStatus = -1
		return returnStatus, err
	}


	// Execute query
	_, err = db.QueryContext(ctx, pQuery, &returnStatus)

	if err != nil {
		returnStatus = -1
		return returnStatus, err
	}

	fmt.Println(returnStatus == 0)

	return returnStatus, nil
}