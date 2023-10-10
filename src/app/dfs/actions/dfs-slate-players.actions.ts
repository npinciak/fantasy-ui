import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlatePlayer } from '../models/player.model';

export class DfsSlatePlayersActions extends GenericActions<SlatePlayer, { slatePath: string }>({
  stateName: 'dfsSlatePlayers',
}) {}
