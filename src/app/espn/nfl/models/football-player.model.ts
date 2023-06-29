import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { TeamRosterEntry } from '@sports-ui/ui-sdk/espn-client';

export type FootballPlayerAttributes = {
  lineupSlot: string | null;
  points: number;
  outlookByWeek: PlayerOutlookByWeek[];
  eligibleLineupSlots?: string;
};

export type FootballPlayer = FantasyPlayer & FootballPlayerAttributes & Pick<TeamRosterEntry, 'lineupSlotId'>;

export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;

export type PlayerOutlookByWeek = {
  week: number;
  outlook: string | null;
};
