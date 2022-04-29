/**
 * Base league model
 */
interface LeagueProperties {
  id: string;
  uid: string | null;
  name: string | null;
  abbreviation: string | null;
  shortName: string | null;
  isTournament: boolean;
  sport?: string | null;
}

export type League = LeagueProperties;
