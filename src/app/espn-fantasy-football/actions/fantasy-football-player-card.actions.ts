import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FootballPlayerCard } from '../models/football-player.model';

export class FantasyFootballPlayerCard extends GenericActions<FootballPlayerCard>({
  stateName: 'fantasyFootballPlayerCard',
}) {}
