import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FastcastEventTeam } from '../models/fastcast-team.model';

export class FastcastTeams extends GenericActions<FastcastEventTeam>({
  stateName: 'espnFastcastTeam',
}) {}
