import { LeagueTransaction } from '@sports-ui/ui-sdk/espn-client';

export interface FantasyLeague {
  id: string;
  seasonId: string;
  scoringPeriodId: string;
  firstScoringPeriod: string;
  finalScoringPeriod: string;
  matchupPeriodCount: string;
  transactions: LeagueTransaction[];
}
