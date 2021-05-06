import Instructor from "./Instructor";
import Service from "./Service";

export interface Session {
  id?: string;
  name?: string;
  date?: Date; // under construction
  time?: Date;
  duration?: number; // under construction
  availableSpaces?: number;
  cost?: number;
  instructor?: Instructor;
  sessionService?: Service;
}

export default Session;
