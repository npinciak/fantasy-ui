import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';

export interface FantasyLeague {
  id: string;
  seasonId: string;
  scoringPeriodId: number;
  firstScoringPeriod: number;
  finalScoringPeriod: number;
  matchupPeriodCount: number;
  playoffMatchupPeriodLength: number;
  transactions: EspnClient.LeagueTransaction[];
}
