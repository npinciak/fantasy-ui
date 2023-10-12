import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflSlatePlayerDetailsActions } from '../actions/dfs-nfl-slate-player-details.actions';
import { DfsNflSlatePlayerDetailsSelector } from '../selectors/dfs-nfl-slate-player-details.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNflSlatePlayerDetailsFacade extends GenericFacade({
  selectorClass: DfsNflSlatePlayerDetailsSelector,
  actionHandler: DfsNflSlatePlayerDetailsActions,
}) {}
