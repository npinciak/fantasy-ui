import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnClientPlayer, EspnClientPlayerInfo, EspnClientPlayerRatings, EspnClientPlayerStatsEntityMap } from '@client/espn-client.model';

export interface BaseballPlayerProps {
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

export type BaseballPlayer = PlayerEntity &
  BaseballPlayerProps &
  Pick<EspnClientPlayerInfo, 'starterStatusByProGame' | 'lastNewsDate'> &
  Pick<EspnClientPlayer, 'lineupSlotId'>;

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Pick<BaseballPlayerProps, 'isInjured' | 'injuryStatus'> &
  Pick<EspnClientPlayer, 'lineupSlotId'> & {
    name: string;
    img: string | null;
    team: string | null;
    position: string | null;
    playerOwnershipChange: number | null;
    playerOwnershipPercentOwned: number | null;
    stats: {};
  };
