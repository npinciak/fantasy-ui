import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FantasyBaseballTeamSelector } from '../selectors/fantasy-baseball-team.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamFacade extends GenericFacade({
  selectorClass: FantasyBaseballTeamSelector,
  actionHandler: FantasyBaseballTeams,
}) {
  teamInfo$ = select(FantasyBaseballTeamSelector.getTeamInfoByTeamId);

  currentRoster$ = select(FantasyBaseballTeamSelector.getCurrentRosterByTeamId);

  startingBatters$ = select(FantasyBaseballTeamSelector.getTeamStartingBatters);
  benchBatters$ = select(FantasyBaseballTeamSelector.getTeamBenchBatters);
  injuredBatters$ = select(FantasyBaseballTeamSelector.getTeamInjuredReserveBatters);

  teamList$ = select(FantasyBaseballTeamSelector.getList);
  teamListFilterOptions$ = select(FantasyBaseballTeamSelector.teamListFilterOptions);

  batterChartData$ = select(FantasyBaseballTeamSelector.getBatterStatsLineChartData);

  batterStatsScatterChartData$ = select(FantasyBaseballTeamSelector.getBatterStatsScatterChartData);

  battingStats$ = select(FantasyBaseballTeamSelector.getTeamBatterStats);

  pitchers$ = select(FantasyBaseballTeamSelector.getTeamPitchers);
  startingPitchers$ = select(FantasyBaseballTeamSelector.getTeamStartingPitchers);
  benchPitchers$ = select(FantasyBaseballTeamSelector.getTeamBenchPitchers);

  pitcherStats$ = select(FantasyBaseballTeamSelector.getTeamPitcherStats);
  pitcherStatsChartData$ = select(FantasyBaseballTeamSelector.getPitcherStatsChartData);
}
