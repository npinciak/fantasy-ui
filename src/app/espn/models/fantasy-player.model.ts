import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnClient } from 'sports-ui-sdk/lib/espn/espn.m';

export type FantasyPlayer = PlayerEntity & {
  lastNewsDate: number;
  injured: boolean;
  injuryStatus: EspnClient.PlayerInjuryStatus;
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
