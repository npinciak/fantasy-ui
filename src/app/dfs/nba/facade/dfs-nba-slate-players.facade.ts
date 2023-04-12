import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsSlatePlayers } from '@app/dfs/actions/dfs-players.actions';
import { DfsNbaSlatePlayersSelectors } from '../selectors/dfs-nba-slate-players.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNbaSlatePlayerFacade extends GenericFacade({ selectorClass: DfsNbaSlatePlayersSelectors, actionHandler: DfsSlatePlayers }) {
  getPlayerTableData$ = select(DfsNbaSlatePlayersSelectors.getPlayerTableData);
}
