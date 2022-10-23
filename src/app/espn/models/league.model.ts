/**
 * Base league model
 */

import { EspnLeagueId } from '@espnClient/espn-client.model';

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

export const LeagueNameByEspnLeagueId: { [key in EspnLeagueId]: string } = {
  [EspnLeagueId.MLB]: 'MLB',
  [EspnLeagueId.NCAAF]: 'NCAAF',
  [EspnLeagueId.NFL]: 'NFL',
  [EspnLeagueId.NBA]: 'NBA',
  [EspnLeagueId.NHL]: 'NHL',
};
