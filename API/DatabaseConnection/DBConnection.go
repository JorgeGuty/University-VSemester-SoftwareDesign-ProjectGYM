package main

import (
	_ "github.com/denisenkom/go-mssqldb"
	"database/sql"
	"context"
	"log"
	"fmt"
	"errors"
)

var db *sql.DB

var server = "carrera.database.windows.net"
var port = 1433
var user = "trabajadorResponsable"
var password = "1231!#ASDF!a"
var database = "PlusGymProject"

func main(){
	connect()
}

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

type testyInt struct {
	id int
}

func read() ([]testyInt, error){
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return []testyInt{}, err
	}

	tsql := fmt.Sprintf("SELECT testy FROM dbo.Test;")

	// Execute query
	rows, err := db.QueryContext(ctx, tsql)
	if err != nil {
		return []testyInt{}, err
	}

	defer rows.Close()

	var count int

	var result []testyInt
	// Iterate through the result set.
	for rows.Next() {
		var testy int

		// Get values from row.
		err := rows.Scan(&testy)
		if err != nil {
			return []testyInt{}, err
		}

		result = append(result, testyInt{id: testy})

		fmt.Printf("ID: %d \n", testy)
		count++
	}
	return result, nil
}

func insert(pTesty int) (bool, error){
	ctx := context.Background()
	var err error

	if db == nil {
		err = errors.New("CreateEmployee: db is null")
		return false, err
	}

	// Check if database is alive.
	err = db.PingContext(ctx)
	if err != nil {
		return false, err
	}

	query := fmt.Sprintf("INSERT INTO dbo.Test (testy) VALUES (%d);", pTesty)

	_, err = db.ExecContext(ctx, query)

	if err != nil{
		return false, err
	}
	return true, nil
}

func update(id int, newId int) (bool, error){
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return false, err
	}

	tsql := fmt.Sprintf("UPDATE dbo.Test SET testy = @NewTesty WHERE testy = @OldTesty")

	// Execute non-query with named parameters
	_, err = db.ExecContext(
		ctx,
		tsql,
		sql.Named("NewTesty", newId),
		sql.Named("OldTesty", id))
	if err != nil {
		return false, err
	}

	return true, nil
}

func remove(id int) (bool, error){
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return false, err
	}

	tsql := fmt.Sprintf("DELETE FROM dbo.Test WHERE testy = @ID;")

	// Execute non-query with named parameters
	_, err = db.ExecContext(ctx, tsql, sql.Named("ID", id))
	if err != nil {
		return false, err
	}

	return true, nil
}

