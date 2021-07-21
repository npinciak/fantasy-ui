interface EspnClientEventList {
  events: EspnClientEvent[];
}

interface EspnClientEvent {
  id: string;
  date: string;
  summary: string;
  percentComplete: number;
  competitors: EspnClientCompetitor[];
  fullStatus: EspnClientFullEventStatus;
}

interface EspnClientFullEventStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: EspnClientEventStatusType;
  halfInning: number;
  periodPrefix: string;
}

interface EspnClientEventStatusType {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

interface EspnClientCompetitor {
  id: string;
  homeAway: string | 'home' | 'away';
  score: number | string;
  record: string;
  abbreviation: string;
  winner: boolean;
}

export { EspnClientEventList, EspnClientEvent, EspnClientFullEventStatus, EspnClientEventStatusType, EspnClientCompetitor };
