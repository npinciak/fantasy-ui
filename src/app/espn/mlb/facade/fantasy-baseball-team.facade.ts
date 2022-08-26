import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTeamsSelector } from '../selectors/fantasy-baseball-teams.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamFacade extends GenericFacade(FantasyBaseballTeamsSelector) {
  teamList$ = select(FantasyBaseballTeamsSelector.getList);
  liveScore$ = select(FantasyBaseballTeamsSelector.getTeamListLive);
  startingBatters$ = select(FantasyBaseballTeamsSelector.getTeamStartingBatters);
  benchBatters$ = select(FantasyBaseballTeamsSelector.getTeamBenchBatters);
  batterChartData$ = select(FantasyBaseballTeamsSelector.getBatterStatsChartData);
  batterStatsScatterChartData$ = select(FantasyBaseballTeamsSelector.getBatterStatsScatterChartData);

  liveBattingStats$ = select(FantasyBaseballTeamsSelector.getLiveTeamBatterStats);
  battingStats$ = select(FantasyBaseballTeamsSelector.getTeamBatterStats);
  pitchers$ = select(FantasyBaseballTeamsSelector.getTeamPitchers);
  startingPitchers$ = select(FantasyBaseballTeamsSelector.getTeamStartingPitchers);

  pitcherStats$ = select(FantasyBaseballTeamsSelector.getTeamPitcherStats);
  pitcherStatsChartData$ = select(FantasyBaseballTeamsSelector.getPitcherStatsChartData);
  pitcherStatsScatterChartData$ = select(FantasyBaseballTeamsSelector.getPitcherStatsScatterChartData);
}
