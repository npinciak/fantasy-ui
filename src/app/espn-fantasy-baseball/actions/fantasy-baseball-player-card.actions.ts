import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { BaseballPlayerCard } from '../models/baseball-player.model';

export class FantasyBaseballPlayerCard extends GenericActions<BaseballPlayerCard>({
  stateName: 'fantasyBaseballPlayerCard',
}) {}
