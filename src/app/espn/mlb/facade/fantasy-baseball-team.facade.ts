import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTeamsSelector } from '../selectors/fantasy-baseball-teams.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamFacade extends GenericFacade(FantasyBaseballTeamsSelector) {
  teamList$ = select(FantasyBaseballTeamsSelector.getList);
  liveScore$ = select(FantasyBaseballTeamsSelector.getTeamListLive);
  startingBatters$ = select(FantasyBaseballTeamsSelector.getTeamStartingBatters);
  benchBatters$ = select(FantasyBaseballTeamsSelector.getTeamBenchBatters);
  batterChartData$ = select(FantasyBaseballTeamsSelector.getBatterStatsChartData);
  liveBattingStats$ = select(FantasyBaseballTeamsSelector.getLiveTeamBatterStats);
  battingStats$ = select(FantasyBaseballTeamsSelector.getTeamBatterStats);
  pitchers$ = select(FantasyBaseballTeamsSelector.getTeamPitchers);
  pitcherStats$ = select(FantasyBaseballTeamsSelector.getTeamPitcherStats);
  pitcherStatsChartData = select(FantasyBaseballTeamsSelector.getPitcherStatsChartData);
  isLoading$ = select(FantasyBaseballLeagueState.isLoading);
}
