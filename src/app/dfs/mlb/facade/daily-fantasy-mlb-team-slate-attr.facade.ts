import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DailyFantasyMlbTeamSlateAttributeSelectors } from '../selectors/daily-fantasy-mlb-team-slate-attr.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyMlbTeamSlateAttrFacade extends GenericFacade(DailyFantasyMlbTeamSlateAttributeSelectors) {}
