import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlatePlayer } from '../models/player.model';

export class DfsSlatePlayers extends GenericActions<SlatePlayer, { slatePath: string }>({
  stateName: 'dfsSlatePlayers',
}) {}
