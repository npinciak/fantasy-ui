import { Situation } from './espn-fastcast.model';
import { FastcastEventTeam } from './fastcast-team.model';

export interface FastcastEventProperties {
  id: string;
  leagueId: string;
  timestamp: number | null;
  state: string | null;
  status: string | null;
  name: string | null;
  shortname: string | null;
  location: string | null;
  clock: string | null;
  summary: string | null;
  period: number | null;
  teams: Record<string, FastcastEventTeam>;
  isHalftime: boolean;
  downDistancePositionText: string | null;
}

export type FastcastEvent = FastcastEventProperties & Pick<Partial<Situation>, 'lastPlay'>;

export type FastcastEventMap = Record<string, FastcastEvent>;
