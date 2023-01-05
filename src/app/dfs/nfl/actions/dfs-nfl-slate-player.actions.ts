import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlatePlayer } from '@app/dfs/models/slate-player.model';

export class DfsNflSlatePlayer extends GenericActions<SlatePlayer>({ stateName: 'dfsNflSlatePlayer' }) {}
