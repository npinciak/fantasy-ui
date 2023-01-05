import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlatePlayer } from '@app/dfs/models/slate-player.model';

export class DfsMlbSlatePlayer extends GenericActions<SlatePlayer>({ stateName: 'dfsMlbSlatePlayer' }) {}
