export interface PreliminarySession {
  name?: string;
  year?: number;
  month?: number;
  weekDay?: number;
  startTime?: string; // { hour: number; min: number }
  durationMins?: number;
  instructorIdentification?: string;
  service?: string;
  roomId?: number;
}

export default PreliminarySession;
