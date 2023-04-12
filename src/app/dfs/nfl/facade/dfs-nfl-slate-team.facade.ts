import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsNflSlateTeamDetails } from '../actions/dfs-nfl-slate-team.actions';
import { DfsNflSlateTeamDetailsSelectors } from '../selectors/dfs-nfl-slate-team.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsNflSlateTeamDetailsFacade extends GenericFacade({
  selectorClass: DfsNflSlateTeamDetailsSelectors,
  actionHandler: DfsNflSlateTeamDetails,
}) {
  matchupGraphData$ = select(DfsNflSlateTeamDetailsSelectors.getMatchupGraphData);
}
