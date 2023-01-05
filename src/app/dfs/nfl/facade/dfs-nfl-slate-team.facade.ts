import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsNflSlateTeamDetailsSelectors } from '../selectors/dfs-nfl-slate-team.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsNflSlateTeamDetailsFacade extends GenericFacade(DfsNflSlateTeamDetailsSelectors) {
  matchupGraphData$ = select(DfsNflSlateTeamDetailsSelectors.getMatchupGraphData);
}
