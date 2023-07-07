import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTeamsLive } from '../actions/fantasy-baseball-team-live.actions';
import { FantasyBaseballTeamLiveSelector } from '../selectors/fantasy-baseball-team-live.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamLiveFacade extends GenericFacade({
  selectorClass: FantasyBaseballTeamLiveSelector,
  actionHandler: FantasyBaseballTeamsLive,
}) {
  standings$ = select(FantasyBaseballTeamLiveSelector.standings);
  liveBattingStats$ = select(FantasyBaseballTeamLiveSelector.getLiveTeamStartingBatterStats);
  liveTeamBatterStatsTableRows$ = select(FantasyBaseballTeamLiveSelector.getLiveTeamStartingBatterStatsTableRows);
  liveTeamBenchBatterStatsTableRows$ = select(FantasyBaseballTeamLiveSelector.getLiveTeamBenchBatterStatsTableRows);

  statsStandingsLineChartData$ = select(FantasyBaseballTeamLiveSelector.getStatsStandingsLineChartData);
  rotoStandingsLineChartData$ = select(FantasyBaseballTeamLiveSelector.getRotoStatsStandingsLineChartData);
}
