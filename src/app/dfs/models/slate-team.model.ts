import { Outsiders, SaFpts } from '../nfl/models/nfl-slate-attr.model';
import { Team } from './team.model';
import { Vegas } from './vegas.model';

export type SlateTeam = Pick<Team, 'id'> & {
  vegas: Vegas | null;
};
export type SlateTeamMap = Record<string, SlateTeam>;
export type SlateTeamNfl = SlateTeam & {
  outsiders: Outsiders | null;
  safpts: SaFpts | null;
};
