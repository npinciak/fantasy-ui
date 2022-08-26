import { Player } from '@app/espn/models/player.model';
import { EspnClientPlayer, EspnClientPlayerInfo, EspnClientPlayerRatings, EspnClientPlayerStatsEntityMap } from '@client/espn-client.model';

export interface BaseballPlayerProperties {
  isInjured: boolean;
  injuryStatus: string | null;
  isStarting: boolean;
  startingStatus: string | null;
  playerRatings: EspnClientPlayerRatings | undefined;
  stats: EspnClientPlayerStatsEntityMap | null;
  playerOwnershipChange: number | null;
  playerOwnershipPercentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string;
}

export type BaseballPlayer = Player &
  BaseballPlayerProperties &
  Pick<EspnClientPlayerInfo, 'starterStatusByProGame' | 'lastNewsDate'> &
  Pick<EspnClientPlayer, 'lineupSlotId'>;

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Pick<BaseballPlayerProperties, 'isInjured' | 'injuryStatus'> &
  Pick<EspnClientPlayer, 'lineupSlotId'> & {
    name: string;
    img: string | null;
    team: string | null;
    position: string | null;
    playerOwnershipChange: number | null;
    playerOwnershipPercentOwned: number | null;
    stats: {};
  };
