import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { PlayerStatsYear, TeamRosterEntry } from '@sports-ui/ui-sdk/espn-client';

export type FootballPlayerAttributes = {
  lineupSlot: string | null;
  outlookByWeek: PlayerOutlookByWeek[];
  eligibleLineupSlots?: string;
};

export type FootballPlayer = FantasyPlayer & FootballPlayerAttributes & Pick<TeamRosterEntry, 'lineupSlotId'>;
export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;

export type FootballPlayerStatsRow = Pick<
  FootballPlayer,
  | 'id'
  | 'name'
  | 'position'
  | 'team'
  | 'lineupSlotId'
  | 'injured'
  | 'injuryStatus'
  | 'img'
  | 'percentChange'
  | 'percentOwned'
  | 'defaultPositionId'
> &
  Pick<PlayerStatsYear, 'stats' | 'appliedTotal' | 'appliedAverage' | 'appliedTotalCeiling'> & { highlightedPlayer: boolean };

export type PlayerOutlookByWeek = {
  week: number;
  outlook: string | null;
};
