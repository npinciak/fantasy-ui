import { Injectable } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Select, Store } from '@ngxs/store';
import { ChartData, ScatterDataPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeamTableRow } from '../models/baseball-team.model';
import { FantasyBaseballTeamsSelector } from '../selectors/fantasy-baseball-teams.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamFacade {
  @Select(FantasyBaseballTeamsSelector.selectTeamList) public teamList$: Observable<BaseballTeamTableRow[]>;
  @Select(FantasyBaseballTeamsSelector.selectTeamList) public liveScore$: Observable<BaseballTeamTableRow[]>;

  @Select(FantasyBaseballTeamsSelector.selectStatListFilters) public statListFilters$: Observable<FilterOptions[]>;

  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  selectTeamById(id: string): BaseballTeamTableRow {
    return this.store.selectSnapshot(FantasyBaseballTeamsSelector.selectTeamById)(id);
  }

  getTeamStartingBatters(id: string): BaseballPlayer[] {
    return this.store.selectSnapshot(FantasyBaseballTeamsSelector.getTeamStartingBatters)(id);
  }

  teamDynamicScatterChartData(xAxis, yAxis): ChartData<'scatter', (number | ScatterDataPoint)[], unknown> {
    return this.store.selectSnapshot(FantasyBaseballTeamsSelector.teamDynamicScatterChartData)(xAxis, yAxis);
  }
}
