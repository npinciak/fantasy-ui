import { EspnGameStatusTypeId, FastCastGameStatus } from '@espnClient/espn-client.model';
import { EspnClientOddsEntity, EventsEntity, FullStatusType, Situation } from '@espnClient/espn-fastcast.model';
import { FastcastEventTeam } from './fastcast-team.model';

interface FastcastEventAttributes {
  leagueId: string;
  timestamp: number;
  state: string | null;
  status: FastCastGameStatus | null;
  statusId: EspnGameStatusTypeId;
  location: string | null;
  clock: string | null;
  summary: string | null;
  period: number | null;
  teams: Record<string, FastcastEventTeam> | null;
  isHalftime: boolean;
  mlbSituation: MlbSituation | null;
  footballSituation: FootballSituation | null;
}

export type FastcastEvent = FastcastEventAttributes &
  Partial<Situation> &
  Pick<EventsEntity, 'id' | 'uid' | 'name' | 'shortName' | 'note' | 'seriesSummary' | 'link' | 'seasonType'> &
  Pick<FullStatusType, 'completed'> & { odds: EspnClientOddsEntity | null };
export type FastcastEventMap = Record<string, FastcastEvent>;

export type MlbSituation = Pick<Situation, 'balls' | 'strikes' | 'outs' | 'onFirst' | 'onSecond' | 'onThird' | 'batter' | 'pitcher'>;
export type FootballSituation = Pick<Situation, 'isRedZone' | 'possession' | 'shortDownDistanceText' | 'possessionText'>;
