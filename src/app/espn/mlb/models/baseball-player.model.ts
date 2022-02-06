import { EspnClientPlayerRatings, EspnClientPlayerStatsYear } from '@app/espn/espn-client.model';
import { Player } from '@app/espn/models/player.model';

export interface BaseballPlayerProperties {
  isInjured: boolean;
  injuryStatus: string;
  lineupSlot: number;
  isStarting: boolean;
  startingStatus: string;
  playerRatings: EspnClientPlayerRatings;
  stats: EspnClientPlayerStatsYear[];
  playerOwnershipChange: number;
  playerOwnershipPercentOwned: number;
  isPitcher: boolean;
}

export type BaseballPlayer = Player & Partial<BaseballPlayerProperties>;
