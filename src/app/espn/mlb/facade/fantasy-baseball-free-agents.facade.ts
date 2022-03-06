import { Injectable } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Select, Store } from '@ngxs/store';
import { ChartData, ScatterDataPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsSelector } from '../selectors/fantasy-baseball-free-agents.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFacade {
  @Select(FantasyBaseballFreeAgentsSelector.selectPlayerList) public playerList$: Observable<BaseballPlayer[]>;

  @Select(FantasyBaseballFreeAgentsSelector.selectStatListFilters) public selectStatListFilters$: Observable<FilterOptions[]>;

  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  selectFreeAgentStats(statPeriod: string) {
    return this.store.selectSnapshot(FantasyBaseballFreeAgentsSelector.selectFreeAgentStats)(statPeriod);
  }

  selectPlayerById(id: string): BaseballPlayer {
    return this.store.selectSnapshot(FantasyBaseballFreeAgentsSelector.selectPlayerById)(id);
  }

  freeAgentDynamicLineChartData(xAxis, stat): ChartData<'line' | 'bar', (number | ScatterDataPoint)[], unknown> {
    return this.store.selectSnapshot(FantasyBaseballFreeAgentsSelector.freeAgentDynamicLineChartData)(xAxis, stat);
  }

  freeAgentScatterChartData(xAxis, yaxis, statTimePeriodId): ChartData<'scatter', (number | ScatterDataPoint)[], unknown> {
    return this.store.selectSnapshot(FantasyBaseballFreeAgentsSelector.freeAgentDynamicScatterChartData)(xAxis, yaxis, statTimePeriodId);
  }
}
