import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsSlatePlayersActions } from '@app/dfs/actions/dfs-slate-players.actions';
import { DfsNbaSlatePlayersSelectors } from '../selectors/dfs-nba-slate-players.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNbaSlatePlayerFacade extends GenericFacade({
  selectorClass: DfsNbaSlatePlayersSelectors,
  actionHandler: DfsSlatePlayersActions,
}) {
  getPlayerTableData$ = select(DfsNbaSlatePlayersSelectors.getPlayerTableData);
}
