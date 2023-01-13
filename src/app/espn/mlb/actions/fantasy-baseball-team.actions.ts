import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { BaseballTeam } from '../models/baseball-team.model';

export class FantasyBaseballTeams extends GenericActions<BaseballTeam>({
  stateName: 'fantasyBaseballTeams',
}) {}
