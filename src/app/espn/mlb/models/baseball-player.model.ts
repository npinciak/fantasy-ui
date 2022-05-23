import { EspnClientPlayerInfo, EspnClientPlayerRatings, EspnClientPlayerStatsEntityMap } from '@app/espn/espn-client.model';
import { Player } from '@app/espn/models/player.model';

export interface BaseballPlayerProperties {
  isInjured: boolean;
  injuryStatus: string | null;
  lineupSlotId: number;
  isStarting: boolean;
  startingStatus: string | null;
  playerRatings: EspnClientPlayerRatings | undefined;
  stats: EspnClientPlayerStatsEntityMap | undefined;
  playerOwnershipChange: number | null;
  playerOwnershipPercentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string;
}

export type BaseballPlayer = Player & BaseballPlayerProperties & Pick<EspnClientPlayerInfo, 'starterStatusByProGame'>;
export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export interface BaseballPlayerStatsRow {
  name: string | null;
  img: string | null;
  team: string | null;
  position: string | null;
  playerOwnershipChange: number | null;
  playerOwnershipPercentOwned: number | null;
  stats: {};
}
