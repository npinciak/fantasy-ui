import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FastcastLeague } from '../models/fastcast-league.model';

export class FastcastLeagues extends GenericActions<FastcastLeague>({
  stateName: 'espnFastcastLeagues',
}) {}
