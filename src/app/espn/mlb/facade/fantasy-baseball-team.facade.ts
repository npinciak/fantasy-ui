import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTeamSelector } from '../selectors/fantasy-baseball-team.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamFacade extends GenericFacade(FantasyBaseballTeamSelector) {
  teamInfo$ = select(FantasyBaseballTeamSelector.getTeamInfoByTeamId);

  currentRoster$ = select(FantasyBaseballTeamSelector.getCurrentRosterByTeamId);

  startingBatters$ = select(FantasyBaseballTeamSelector.getTeamStartingBatters);
  benchBatters$ = select(FantasyBaseballTeamSelector.getTeamBenchBatters);

  teamList$ = select(FantasyBaseballTeamSelector.getList);
  teamListFilterOptions$ = select(FantasyBaseballTeamSelector.teamListFilterOptions);

  batterChartData$ = select(FantasyBaseballTeamSelector.getBatterStatsLineChartData);

  batterStatsScatterChartData$ = select(FantasyBaseballTeamSelector.getBatterStatsScatterChartData);



  battingStats$ = select(FantasyBaseballTeamSelector.getTeamBatterStats);

  pitchers$ = select(FantasyBaseballTeamSelector.getTeamPitchers);
  startingPitchers$ = select(FantasyBaseballTeamSelector.getTeamStartingPitchers);

  pitcherStats$ = select(FantasyBaseballTeamSelector.getTeamPitcherStats);
  pitcherStatsChartData$ = select(FantasyBaseballTeamSelector.getPitcherStatsChartData);
  pitcherStatsScatterChartData$ = select(FantasyBaseballTeamSelector.getPitcherStatsScatterChartData);
}
