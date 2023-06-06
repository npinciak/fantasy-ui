import { EspnClient } from '@sports-ui/ui-sdk/espn';

export interface FantasyLeague {
  id: string;
  seasonId: string;
  scoringPeriodId: string;
  firstScoringPeriod: string;
  finalScoringPeriod: string;
  matchupPeriodCount: string;
  transactions: EspnClient.LeagueTransaction[];
}
