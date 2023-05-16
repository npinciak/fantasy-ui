import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { PlayerStandingsEntity } from '../models/isportgenius-client.model';

export class SportsBookPlayerStandings extends GenericActions<PlayerStandingsEntity>({
  stateName: 'sportsBookPlayerStandings',
}) {}
