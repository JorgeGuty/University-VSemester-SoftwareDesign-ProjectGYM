package WebServer

import (
	"API/Database"
	_ "API/Database"
	"encoding/json"
	//"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
)

func StartServer() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.GET("/users/:id", getUser)
	e.GET("/testy/insert/:id", insertTest)
	e.GET("/testy/get", getTest)
	e.Logger.Fatal(e.Start(":1323"))
}

type test struct {
	MyId int
}

func getTest(context echo.Context) error {
	results, err := Database.ReadTransaction("SELECT * FROM dbo.Test;")
	if err != nil {
		context.String(http.StatusInternalServerError, err.Error())
	}

	var tests []test

	for results.Next() {
		var id int

		// Get values from row.
		err := results.Scan(&id)
		if err != nil {
			return context.String(http.StatusInternalServerError, err.Error())
		}

		tests = append(tests, test{MyId: id})
	}
	jsonResult, err := json.Marshal(tests)
	return context.String(http.StatusOK, string(jsonResult))
}

func insertTest(context echo.Context) error {
	value := context.Param("id")
	success, err := Database.VoidTransaction("INSERT INTO dbo.Test VALUES ("+value+")")
	if err != nil {
		return context.String(http.StatusInternalServerError, err.Error())
	}

	if success {
		return context.String(http.StatusOK, "true")
	} else {
		return context.String(http.StatusOK, "false")
	}


}

func getUser(c echo.Context) error {
	// User ID from path `users/:id`
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

