import { EspnClientPlayerRatings, EspnClientPlayerStatsYear } from '@app/espn/espn-client.model';
import { Player } from '@app/espn/models/player.model';

export interface BaseballPlayerProperties {
  isInjured: boolean;
  injuryStatus: string;
  lineupSlotId: number;
  isStarting: boolean;
  startingStatus: string;
  playerRatings: EspnClientPlayerRatings;
  stats: EspnClientPlayerStatsYear[];
  playerOwnershipChange: number;
  playerOwnershipPercentOwned: number;
  isPitcher: boolean;
  lineupSlot: string;
}

export type BaseballPlayer = Player & BaseballPlayerProperties;
export type BaseballPlayerMap = Record<string, BaseballPlayer>;
