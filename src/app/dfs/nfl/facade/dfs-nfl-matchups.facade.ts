import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { DfsMatchupsFacade } from '@app/dfs/facade/dfs-matchups.facade';
import { DfsNflMatchupsSelectors } from '../selectors/dfs-nfl-matchups.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsNflMatchupsFacade extends DfsMatchupsFacade {
  nflMatchupTableData$ = select(DfsNflMatchupsSelectors.getNflMatchupTableData);
  nflTopFiveMatchupsByOverUnder$ = select(DfsNflMatchupsSelectors.getTopFiveMatchupsByOverUnder);
  nflTopFiveTeamTotals$ = select(DfsNflMatchupsSelectors.getTopFiveTeamTotals);
}
