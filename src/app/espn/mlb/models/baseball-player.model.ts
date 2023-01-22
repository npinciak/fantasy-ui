import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnClient } from 'sports-ui-sdk';

export interface BaseballPlayerProps {
  isStarting: boolean;
  playerRatings: EspnClient.PlayerRatings | undefined;
  stats: EspnClient.PlayerStatsEntityMap | null;
  percentChange: number | null;
  percentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string;
}

export type BaseballPlayer = PlayerEntity &
  BaseballPlayerProps &
  Pick<EspnClient.PlayerInfo, 'injured' | 'injuryStatus' | 'starterStatusByProGame' | 'lastNewsDate'> &
  Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'>;

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Pick<PlayerEntity, 'id'> &
  Pick<BaseballPlayer, 'injured' | 'injuryStatus'> &
  Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'> & {
    name: string;
    img: string | null;
    team: string | null;
    position: string | null;
    percentChange: number | null;
    percentOwned: number | null;
    highlightedPlayer: boolean;
    stats: EspnClient.PlayerStatsEntity;
  };
