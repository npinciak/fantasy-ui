import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ChartData } from 'chart.js';
import { Observable } from 'rxjs';
import { DailyFantasySlateAttrSelectors, TeamList } from '../selectors/daily-fantasy-slate-attr.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateAttrFacade {
  @Select(DailyFantasySlateAttrSelectors.selectTeamList) selectTeamList$: Observable<TeamList[]>;
  @Select(DailyFantasySlateAttrSelectors.scatterChartData) scatterChartData$: Observable<ChartData<'scatter'>>;
  @Select(DailyFantasySlateAttrSelectors.scatterChartLabels) scatterChartLabels$: Observable<string[]>;

  constructor(private store: Store) {}

  selectTeamList(): TeamList[] {
    return this.store.selectSnapshot(DailyFantasySlateAttrSelectors.selectTeamList);
  }
}
