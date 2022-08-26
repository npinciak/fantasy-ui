/**
 * Base league model
 */
interface LeagueProperties {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  shortName: string;
  isTournament: boolean;
  sport?: string;
}

export type League = LeagueProperties;

export interface SportsUiClientLeague {
  id: number;
  leagueName: string;
  leagueId: string;
  leagueSport: string;
  createdAt: string;
  updatedAt: string;
}
