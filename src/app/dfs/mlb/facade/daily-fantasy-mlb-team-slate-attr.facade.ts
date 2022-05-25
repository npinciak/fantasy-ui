import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { TeamList } from '@app/dfs/selectors/daily-fantasy-slate-attr.selectors';
import { TableColumn } from '@app/espn/models/table.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DailyFantasyMlbTeamSlateAttributeSelectors } from '../selectors/daily-fantasy-mlb-team-slate-attr.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyMlbTeamSlateAttrFacade extends GenericFacade(DailyFantasyMlbTeamSlateAttributeSelectors) {
  @Select(DailyFantasyMlbTeamSlateAttributeSelectors.getTeamList) teamList$: Observable<TeamList[]>;
  @Select(DailyFantasyMlbTeamSlateAttributeSelectors.getTeamMatchupColumns) teamMatchupColumns$: Observable<TableColumn[]>;
}
