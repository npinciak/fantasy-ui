import { EventsEntity, Situation, Type } from './espn-fastcast.model';
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
  teams?: Record<string, FastcastEventTeam>; // TODO: remove
  isHalftime: boolean;
  mlbSituation: MlbSituation | null;
  footballSituation: FootballSituation | null;
}

export type FastcastEvent = FastcastEventProperties & Partial<Situation> & Pick<EventsEntity, 'uid' | 'note'> & Pick<Type, 'completed'>;
export type FastcastEventMap = Record<string, FastcastEvent>;

export type MlbSituation = Pick<Situation, 'balls' | 'strikes' | 'outs' | 'onFirst' | 'onSecond' | 'onThird' | 'batter' | 'pitcher'>;
export type FootballSituation = Pick<Situation, 'isRedZone' | 'possession' | 'shortDownDistanceText' | 'possessionText'>;
