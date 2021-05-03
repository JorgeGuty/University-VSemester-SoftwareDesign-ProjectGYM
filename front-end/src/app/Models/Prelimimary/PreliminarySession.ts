export interface PreliminarySession {
  name?: string;
  day?: number;
  time?: { hour: number; min: number };
  duration?: number; // under construction
  cost?: number;
  instructorId?: number;
  sessionServiceId?: number;
}

export default PreliminarySession;
