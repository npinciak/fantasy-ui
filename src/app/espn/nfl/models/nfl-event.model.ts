import { EspnClientCompetitor } from '@app/espn/espn-client.model';

export interface NflEventProperties {
  id: string | null;
  date: string | null;
  summary: string | null;
  teams: { [homeAway: string]: any };
}

export type NflEvent = NflEventProperties;
export type NflEventTeams = EspnClientCompetitor[];
