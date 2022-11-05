import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  EspnClientPlayer,
  EspnClientPlayerInfo,
  EspnClientPlayerOwnership,
  EspnClientPlayerStatsByYearMap,
  EspnPlayerInjuryStatus,
} from '@espnClient/espn-client.model';

export interface FootballPlayerAttributes {
  injuryStatus: EspnPlayerInjuryStatus | null;
  lineupSlot: string | null;
  points: number;
  stats: EspnClientPlayerStatsByYearMap | null;
  outlookByWeek: PlayerOutlookByWeek[];
}

export type FootballPlayer = PlayerEntity &
  FootballPlayerAttributes &
  Pick<EspnClientPlayer, 'lineupSlotId'> &
  Pick<EspnClientPlayerInfo, 'defaultPositionId' | 'injured'> &
  Pick<EspnClientPlayerOwnership, 'percentChange' | 'percentOwned' | 'percentStarted'>;

export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;

export type PlayerOutlookByWeek = {
  week: number;
  outlook: string | null;
};
