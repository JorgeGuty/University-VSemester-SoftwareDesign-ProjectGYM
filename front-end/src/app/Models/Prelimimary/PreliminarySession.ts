export interface PreliminarySession {
  name?: string;
  year?: number;
  day?: number;
  time?: string; // { hour: number; min: number }
  duration?: number;
  cost?: number;
  instructorId?: string;
  serviceName?: string;
  roomId?: number;
}

export default PreliminarySession;
