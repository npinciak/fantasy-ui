import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DailyFantasyNflTeamSlateAttributeSelectors } from '../selectors/daily-fantasy-nfl-team-slate-attr.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyNflTeamSlateAttrFacade extends GenericFacade(DailyFantasyNflTeamSlateAttributeSelectors) {
  matchupGraphData$ = select(DailyFantasyNflTeamSlateAttributeSelectors.getMatchupGraphData);
}
