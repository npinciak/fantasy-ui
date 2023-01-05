import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { Team } from '../models/team.model';

export class DfsTeams extends GenericActions<Team>({
  stateName: 'dfsTeams',
}) {}
