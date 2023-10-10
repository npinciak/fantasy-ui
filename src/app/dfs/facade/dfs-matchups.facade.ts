import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsMatchupsActions } from '../actions/dfs-matchups.actions';
import { DfsMatchupsSelectors } from '../selectors/dfs-matchups.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsMatchupsFacade extends GenericFacade({ selectorClass: DfsMatchupsSelectors, actionHandler: DfsMatchupsActions }) {
  nflMatchupTableData$ = select(DfsMatchupsSelectors.getNflMatchupTableData);
  nflTopFiveMatchupsByOverUnder$ = select(DfsMatchupsSelectors.getTopFiveMatchupsByOverUnder);
  nflTopFiveTeamTotals$ = select(DfsMatchupsSelectors.getTopFiveTeamTotals);
}
