import { EspnClientCompetitor } from '../interface';

export interface MlbEventProperties {
  id: string | null;
  date: string | null;
  summary: string | null;
  teams: { [homeAway: string]: MlbEventTeams };
}

export type MlbEvent = MlbEventProperties;
export type MlbEventTeams = EspnClientCompetitor[];
