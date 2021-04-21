package main

import (
	_ "API/DatabaseConnection"
	"API/WebServer"
	_ "API/WebServer"
	"encoding/json"
	"fmt"
)

type s struct {
	Int       int
	String    string
	ByteSlice []byte
}

func main() {

	a := &s{42, "Hello World!", []byte{0,1,2,3,4}}

	out, err := json.Marshal(a)
	if err != nil {
		panic (err)
	}

	fmt.Println(string(out))

	WebServer.StartServer()


}
