export interface FantasyFootballLeagueStateModel {
  seasonId: number | null;
  scoringPeriodId: number | null;
  firstScoringPeriod: number | null;
  finalScoringPeriod: number | null;
  matchupPeriodCount: number | null;
  leagueId: string | null;
  isLoading: boolean;
}

export const INITIAL_STATE = {
  seasonId: null,
  scoringPeriodId: 1,
  firstScoringPeriod: 1,
  finalScoringPeriod: null,
  matchupPeriodCount: null,
  leagueId: null,
  isLoading: false,
};
