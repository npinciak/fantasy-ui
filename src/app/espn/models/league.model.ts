/**
 * Base league model
 */

import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';

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

export const LeagueNameByEspnClient: { [key in EspnClient.LeagueId]: string } = {
  [EspnClient.LeagueId.MLB]: 'MLB',
  [EspnClient.LeagueId.NCAAF]: 'NCAAF',
  [EspnClient.LeagueId.NFL]: 'NFL',
  [EspnClient.LeagueId.NBA]: 'NBA',
  [EspnClient.LeagueId.NHL]: 'NHL',
};
