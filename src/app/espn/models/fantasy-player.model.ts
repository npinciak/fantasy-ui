import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnClient, PlayerInjuryStatus } from 'sports-ui-sdk';

export type FantasyPlayer = PlayerEntity & {
  lastNewsDate: number;
  injured: boolean;
  injuryStatus: PlayerInjuryStatus;
  defaultPositionId: number;
  percentOwned: number;
  percentChange: number;
  percentStarted: number;
  stats: { [year: string]: EspnClient.PlayerStatsYear | null } | null;
  outlookByWeek: {
    week: number;
    outlook: string;
  }[];
};
