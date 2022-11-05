import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  EspnClientPlayer,
  EspnClientPlayerInfo,
  EspnClientPlayerRatings,
  EspnClientPlayerStatsEntityMap,
} from '@espnClient/espn-client.model';

export interface BaseballPlayerProps {
  isStarting: boolean;
  playerRatings: EspnClientPlayerRatings | undefined;
  stats: EspnClientPlayerStatsEntityMap | null;
  percentChange: number | null;
  percentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string;
}

export type BaseballPlayer = PlayerEntity &
  BaseballPlayerProps &
  Pick<EspnClientPlayerInfo, 'injured' | 'injuryStatus' | 'starterStatusByProGame' | 'lastNewsDate'> &
  Pick<EspnClientPlayer, 'lineupSlotId'>;

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Pick<PlayerEntity, 'id'> &
  Pick<BaseballPlayer, 'injured' | 'injuryStatus'> &
  Pick<EspnClientPlayer, 'lineupSlotId'> & {
    name: string;
    img: string | null;
    team: string | null;
    position: string | null;
    percentChange: number | null;
    percentOwned: number | null;
    highlightedPlayer: boolean;
    stats: {};
  };
