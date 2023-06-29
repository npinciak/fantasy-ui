import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { PlayerInjuryStatus } from '@sports-ui/ui-sdk/espn';
import { PlayerStatsYear } from '@sports-ui/ui-sdk/espn-client';

export type FantasyPlayer = PlayerEntity & {
  lastNewsDate: number;
  injured: boolean;
  injuryStatus: PlayerInjuryStatus;
  defaultPositionId: number;
  percentOwned: number;
  percentChange: number;
  percentStarted: number;
  stats: { [year: string]: PlayerStatsYear | null } | null;
  outlookByWeek: FantasyPlayerOutlookByWeek[];
};

type FantasyPlayerOutlookByWeek = {
  week: number;
  outlook: string;
};
