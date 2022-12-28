import { EspnClient, EspnFastcastClient } from 'sports-ui-sdk';

import { FastcastEventTeam } from './fastcast-team.model';

interface FastcastEventAttributes {
  leagueId: string;
  timestamp: number;
  state: string | null;
  status: EspnClient.FastCastGameStatus | null;
  statusId: EspnClient.GameStatusTypeId;
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
  Partial<EspnFastcastClient.Situation> &
  Pick<EspnFastcastClient.EventsEntity, 'id' | 'uid' | 'name' | 'shortName' | 'note' | 'seriesSummary' | 'link' | 'seasonType'> &
  Pick<EspnFastcastClient.FullStatusType, 'completed'> & { odds: EspnFastcastClient.EspnClientOddsEntity | null };
export type FastcastEventMap = Record<string, FastcastEvent>;

export type MlbSituation = Pick<
  EspnFastcastClient.Situation,
  'balls' | 'strikes' | 'outs' | 'onFirst' | 'onSecond' | 'onThird' | 'batter' | 'pitcher'
>;

export type FootballSituation = Pick<EspnFastcastClient.Situation, 'isRedZone' | 'possession' | 'shortDownDistanceText' | 'possessionText'>;
