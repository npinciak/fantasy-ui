import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SpreadEntity } from '../models/isportgenius-client.model';

export class SportsBookLeagueSpread extends GenericActions<SpreadEntity>({ stateName: 'sportsBookLeagueSpread' }) {}
