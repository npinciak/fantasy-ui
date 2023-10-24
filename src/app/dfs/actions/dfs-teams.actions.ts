import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { Team } from '../models/team.model';

export class DfsTeamsActions extends GenericActions<Team>({
  stateName: 'dfsTeams',
}) {}
