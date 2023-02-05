import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FastcastSport } from '../models/fastcast-sport.model';

export class FastcastSports extends GenericActions<FastcastSport>({
  stateName: 'espnFastcastSports',
}) {}
