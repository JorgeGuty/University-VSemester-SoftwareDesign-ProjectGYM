package FreeSpaceObserver

type SessionObserver interface {
	Update(string, string, int)
	//getID() (string, string, int)
}
