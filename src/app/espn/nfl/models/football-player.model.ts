import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnClient } from 'sports-ui-sdk/lib/espn/espn.m';

export interface FootballPlayerAttributes {
  injuryStatus: EspnClient.PlayerInjuryStatus | null;
  lineupSlot: string | null;
  points: number;
  stats: EspnClient.PlayerStatsByYearMap | null;
  outlookByWeek: PlayerOutlookByWeek[];
}

export type FootballPlayer = PlayerEntity &
  FootballPlayerAttributes &
  Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'> &
  Pick<EspnClient.PlayerInfo, 'defaultPositionId' | 'injured'> &
  Pick<EspnClient.PlayerOwnership, 'percentChange' | 'percentOwned' | 'percentStarted'>;

export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;

export type PlayerOutlookByWeek = {
  week: number;
  outlook: string | null;
};
