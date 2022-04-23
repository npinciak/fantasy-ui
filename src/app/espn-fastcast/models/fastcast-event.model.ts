import { EventsEntity, MlbSituationAthlete, Situation, Type } from './espn-fastcast.model';
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
  mlbSituation: MlbSituation;
}

export type FastcastEvent = FastcastEventProperties & Partial<Situation> & Pick<EventsEntity, 'note'> & Pick<Type, 'completed'>;
export type FastcastEventMap = Record<string, FastcastEvent>;

export type MlbSituation = {
  balls: number;
  strikes: number;
  outs: number;
  onFirst: boolean;
  onSecond: boolean;
  onThird: boolean;
  batter: MlbSituationAthlete;
  pitcher: MlbSituationAthlete;
};
