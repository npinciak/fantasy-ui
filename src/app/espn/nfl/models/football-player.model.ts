import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { EspnClient } from 'sports-ui-sdk/lib/espn/espn.m';

export type FootballPlayerAttributes = {
  lineupSlot: string | null;
  points: number;
  outlookByWeek: PlayerOutlookByWeek[];
};

export type FootballPlayer = FantasyPlayer & FootballPlayerAttributes & Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'>;

export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;

export type PlayerOutlookByWeek = {
  week: number;
  outlook: string | null;
};
