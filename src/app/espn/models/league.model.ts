/**
 * Base league model
 */
interface LeagueProps {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  shortName: string;
  isTournament: boolean;
  sport?: string;
}

export type League = LeagueProps;
