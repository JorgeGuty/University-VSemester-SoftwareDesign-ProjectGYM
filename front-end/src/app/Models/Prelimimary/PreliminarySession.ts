export interface PreliminarySession {
  name?: string;
  year?: number;
  month?: number;
  day?: number;
  time?: string; // { hour: number; min: number }
  duration?: number;
  instructorIdNum?: string;
  sessionServiceName?: string;
  roomId?: number;
}

export default PreliminarySession;
