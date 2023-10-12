import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflGridIronActions } from '../actions/dfs-nfl-grid-iron.actions';
import { DfsNflGridIronSelectors } from '../selectors/dfs-nfl-grid-iron.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNflGridIronFacade extends GenericFacade({
  selectorClass: DfsNflGridIronSelectors,
  actionHandler: DfsNflGridIronActions,
}) {}
