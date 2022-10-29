import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  EspnClientPlayer,
  EspnClientPlayerInfo,
  EspnClientPlayerOwnership,
  EspnClientPlayerStatsByYearMap,
  EspnPlayerInjuryStatus,
} from '@espnClient/espn-client.model';
import { ExtendedFootballStatsMap } from './football-extended-stats.model';

export interface FootballPlayerAttributes {
  isInjured: boolean;
  injuryStatus: EspnPlayerInjuryStatus | null;
  lineupSlot: string | null;
  points: number;
  stats: EspnClientPlayerStatsByYearMap | null;
  extendedStats: ExtendedFootballStatsMap | null;
  outlookByWeek: PlayerOutlookByWeek[];
}

export type FootballPlayer = PlayerEntity &
  FootballPlayerAttributes &
  Pick<EspnClientPlayer, 'lineupSlotId'> &
  Pick<EspnClientPlayerInfo, 'defaultPositionId'> &
  Pick<EspnClientPlayerOwnership, 'percentChange' | 'percentOwned'>;

export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;

export type PlayerOutlookByWeek = {
  week: number;
  outlook: string | null;
};
