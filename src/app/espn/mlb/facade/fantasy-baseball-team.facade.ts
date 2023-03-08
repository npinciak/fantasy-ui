import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTeamsSelector } from '../selectors/fantasy-baseball-teams.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamFacade extends GenericFacade(FantasyBaseballTeamsSelector) {
  teamInfo$ = select(FantasyBaseballTeamsSelector.getTeamInfoByTeamId);

  standings$ = select(FantasyBaseballTeamsSelector.standings);

  currentRoster$ = select(FantasyBaseballTeamsSelector.getCurrentRosterByTeamId);

  startingBatters$ = select(FantasyBaseballTeamsSelector.getTeamStartingBatters);
  benchBatters$ = select(FantasyBaseballTeamsSelector.getTeamBenchBatters);

  teamList$ = select(FantasyBaseballTeamsSelector.getList);
  liveScore$ = select(FantasyBaseballTeamsSelector.getTeamListLive);

  batterChartData$ = select(FantasyBaseballTeamsSelector.getBatterStatsLineChartData);

  batterStatsScatterChartData$ = select(FantasyBaseballTeamsSelector.getBatterStatsScatterChartData);

  liveBattingStats$ = select(FantasyBaseballTeamsSelector.getLiveTeamBatterStats);

  battingStats$ = select(FantasyBaseballTeamsSelector.getTeamBatterStats);

  pitchers$ = select(FantasyBaseballTeamsSelector.getTeamPitchers);
  startingPitchers$ = select(FantasyBaseballTeamsSelector.getTeamStartingPitchers);

  pitcherStats$ = select(FantasyBaseballTeamsSelector.getTeamPitcherStats);
  pitcherStatsChartData$ = select(FantasyBaseballTeamsSelector.getPitcherStatsChartData);
  pitcherStatsScatterChartData$ = select(FantasyBaseballTeamsSelector.getPitcherStatsScatterChartData);
}
