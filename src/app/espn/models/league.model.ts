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

export interface SportsUiClientLeague {
  id: number;
  leagueName: string;
  leagueId: string;
  leagueSport: string;
  createdAt: string;
  updatedAt: string;
}

export enum EspnLeagueId {
  MLB = 10,
  NCAAF = 23,
  NFL = 28,
  NBA = 46,
  NHL = 90,
}

export const LeagueNameByEspnLeagueId: { [key in EspnLeagueId]: string } = {
  [EspnLeagueId.MLB]: 'MLB',
  [EspnLeagueId.NCAAF]: 'NCAAF',
  [EspnLeagueId.NFL]: 'NFL',
  [EspnLeagueId.NBA]: 'NBA',
  [EspnLeagueId.NHL]: 'NHL',
};
