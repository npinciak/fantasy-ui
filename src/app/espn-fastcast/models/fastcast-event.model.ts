import { ParsedUid } from '@app/espn/espn-helpers';
import { EspnFastcastClient } from '@sports-ui/ui-sdk/espn';
import { EventStatus, EventStatusType } from '@sports-ui/ui-sdk/espn-client';
import { FastcastEventTeam } from './fastcast-team.model';

interface FastcastEventAttributes {
  timestamp: number;
  state: string | null;
  status: EventStatus | null;
  statusId: EventStatusType;
  location: string | null;
  clock: string | null;
  summary: string | null;
  period: number | null;
  teams: Record<string, FastcastEventTeam> | null;
  isHalftime: boolean;
  mlbSituation: MlbSituation | null;
  footballSituation: FootballSituation | null;
  isTournament: boolean;
}

export type FastcastEvent = FastcastEventAttributes &
  Partial<EspnFastcastClient.Situation> &
  Pick<EspnFastcastClient.EventsEntity, 'id' | 'uid' | 'name' | 'shortName' | 'note' | 'seriesSummary' | 'link' | 'seasonType'> &
  Pick<EspnFastcastClient.FullStatusType, 'completed'> & {
    odds: EspnFastcastClient.EspnClientOddsEntity | null;
    eventIds: ParsedUid | null;
  };

export type FastcastEventMap = Record<string, FastcastEvent>;

export type MlbSituation = Pick<
  EspnFastcastClient.Situation,
  'balls' | 'strikes' | 'outs' | 'onFirst' | 'onSecond' | 'onThird' | 'batter' | 'pitcher'
>;

export type FootballSituation = Pick<EspnFastcastClient.Situation, 'isRedZone' | 'possession' | 'shortDownDistanceText' | 'possessionText'>;
