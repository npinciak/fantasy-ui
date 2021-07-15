interface EventList {
  events: EspnEvent[];
}

interface EspnEvent {
  id: string;
  date: string;
  summary: string;
  percentComplete: number;
  competitors: Competitor[];
  fullStatus: FullEventStatus;
}

interface FullEventStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: EventStatusType;
  halfInning: number;
  periodPrefix: string;
}

interface EventStatusType {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

interface Competitor {
  id: string;
  homeAway: string | 'home' | 'away';
  score: number | string;
  record: string;
  abbreviation: string;
  winner: boolean;
}

export { EventList, EspnEvent, FullEventStatus, EventStatusType, Competitor };
