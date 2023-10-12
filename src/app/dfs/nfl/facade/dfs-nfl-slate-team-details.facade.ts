import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsNflSlateTeamDetailsActions } from '../actions/dfs-nfl-slate-team-details.actions';
import { DfsNflSlateTeamDetailsSelectors } from '../selectors/dfs-nfl-slate-team-details.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNflSlateTeamDetailsFacade extends GenericFacade({
  selectorClass: DfsNflSlateTeamDetailsSelectors,
  actionHandler: DfsNflSlateTeamDetailsActions,
}) {
  matchupGraphData$ = select(DfsNflSlateTeamDetailsSelectors.getMatchupGraphData);
}
