/**
 * Base league model
 */
interface LeagueProperties {
  id: string;
  uid: string | null;
  name: string | null;
  abbreviation: string | null;
  shortName: string | null;
  sport: string | null;
  isTournament: boolean;
}

export type League = LeagueProperties;
