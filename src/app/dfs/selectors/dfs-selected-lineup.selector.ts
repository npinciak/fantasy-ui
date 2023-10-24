import { SelectedSelector } from '@app/@shared/generic-selected-state/generic-selected-selector';
import { DfsSelectedLineupState } from '../state/dfs-selected-lineup.state';

export class DfsSelectedLineupSelector extends SelectedSelector(DfsSelectedLineupState) {}
