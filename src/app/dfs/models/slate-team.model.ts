import { Team } from './team.model';
import { Vegas } from './vegas.model';

type SlateTeamAttributes = {
  vegas: Vegas | null;
};

export type SlateTeam = Pick<Team, 'id'> & SlateTeamAttributes;
export type SlateTeamMap = Record<string, SlateTeam>;
