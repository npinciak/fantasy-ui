import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlatePlayer } from '@app/dfs/models/slate-player.model';

export class DfsMlbSlatePlayerActions extends GenericActions<SlatePlayer>({ stateName: 'dfsMlbSlatePlayer' }) {}
