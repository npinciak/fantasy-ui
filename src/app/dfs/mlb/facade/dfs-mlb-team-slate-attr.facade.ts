import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsSlateAttributes } from '@app/dfs/actions/dfs-slate-attr.actions';
import { DailyFantasyMlbTeamSlateAttributeSelectors } from '../selectors/daily-fantasy-mlb-team-slate-attr.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyMlbTeamSlateAttrFacade extends GenericFacade({
  selectorClass: DailyFantasyMlbTeamSlateAttributeSelectors,
  actionHandler: DfsSlateAttributes,
}) {}
