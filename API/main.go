package main

import (
	_ "API/Database"
	"API/WebServer"
	_ "API/WebServer"
)

type s struct {
	Int       int
	String    string
	ByteSlice []byte
}

func main() {
	WebServer.StartServer()
}
