package main

import (
	_ "API/Database"
	"API/WebServer"
	_ "API/WebServer"
)

func main() {
	WebServer.StartServer()
}
