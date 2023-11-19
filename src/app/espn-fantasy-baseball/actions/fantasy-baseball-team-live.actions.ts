import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { BaseballTeamLive } from '../models/baseball-team.model';

export class FantasyBaseballTeamsLive extends GenericActions<BaseballTeamLive>({
  stateName: 'fantasyBaseballTeamsLive',
}) {}
