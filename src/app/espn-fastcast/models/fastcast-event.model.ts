import { EspnGameStatusTypeId, FastCastGameStatus } from '@client/espn-client.model';
import { EventsEntity, FullStatusType, Situation } from './espn-fastcast.model';
import { FastcastEventTeam } from './fastcast-team.model';

interface FastcastEventProps {
  id: string;
  uid: string;
  leagueId: string;
  timestamp: number;
  state: string | null;
  status: FastCastGameStatus | null;
  statusId: EspnGameStatusTypeId;
  name: string | null;
  shortName: string | null;
  location: string | null;
  clock: string | null;
  summary: string | null;
  period: number | null;
  teams: Record<string, FastcastEventTeam> | null;
  isHalftime: boolean;
  mlbSituation: MlbSituation | null;
  footballSituation: FootballSituation | null;
}

export type FastcastEvent = FastcastEventProps &
  Partial<Situation> &
  Pick<EventsEntity, 'note' | 'seriesSummary'> &
  Pick<FullStatusType, 'completed'>;
export type FastcastEventMap = Record<string, FastcastEvent>;

export type MlbSituation = Pick<Situation, 'balls' | 'strikes' | 'outs' | 'onFirst' | 'onSecond' | 'onThird' | 'batter' | 'pitcher'>;
export type FootballSituation = Pick<Situation, 'isRedZone' | 'possession' | 'shortDownDistanceText' | 'possessionText'>;
