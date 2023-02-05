import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { DfsNbaSlatePlayerState } from '../state/dfs-nba-slate-players.state';
import { exists } from '@app/@shared/utilities/utilities.m';

export class DfsNbaSlatePlayerSelectors extends GenericSelector(DfsNbaSlatePlayerState) {}
