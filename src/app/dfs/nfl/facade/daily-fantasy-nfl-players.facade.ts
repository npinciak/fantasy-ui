import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsSlatePlayers } from '@app/dfs/actions/dfs-slate-players.actions';
import { of } from 'rxjs';
import { DfsNflPlayerSelectors } from '../selectors/dfs-nfl-players.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsNflPlayerFacade extends GenericFacade({ selectorClass: DfsNflPlayerSelectors, actionHandler: DfsSlatePlayers }) {
  playerList$ = select(DfsNflPlayerSelectors.getPlayerTableData);
  teamList$ = select(DfsNflPlayerSelectors.getPlayerTeams);
  positionList$ = select(DfsNflPlayerSelectors.getPlayerPositions);

  playerScatterData$ = select(DfsNflPlayerSelectors.getPlayerScatterData);
  playerScatterAxisOptions$ = select(DfsNflPlayerSelectors.getPlayerScatterAxisOptions);

  playerTeamsFilterOptions$ = select(DfsNflPlayerSelectors.getPlayerTeamsFilterOptions);
  playerPositionFilterOptions$ = select(DfsNflPlayerSelectors.getPlayerPositionFilterOptions);

  teamOwnPercent$ = of(); // select(DfsNflPlayerSelectors.teamOwnPercent);
}
