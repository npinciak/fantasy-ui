import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  EspnClientPlayer,
  EspnClientPlayerInfo,
  EspnClientPlayerOwnership,
  EspnClientPlayerStatsByYearMap,
  EspnPlayerInjuryStatus,
} from '@client/espn-client.model';

export interface FootballPlayerProperties {
  isInjured: boolean;
  injuryStatus: EspnPlayerInjuryStatus | null;
  lineupSlot: string | null;
  points: number;
  stats: EspnClientPlayerStatsByYearMap | null;
}

export type FootballPlayer = PlayerEntity &
  FootballPlayerProperties &
  Pick<EspnClientPlayer, 'lineupSlotId'> &
  Pick<EspnClientPlayerInfo, 'defaultPositionId'> &
  Pick<EspnClientPlayerOwnership, 'percentChange' | 'percentOwned'>;

export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;
