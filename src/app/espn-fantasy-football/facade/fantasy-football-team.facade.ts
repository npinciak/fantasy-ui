import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { of } from 'rxjs';
import { FantasyFootballTeam } from '../actions/fantasy-football-team.actions';
import { FantasyFootballTeamSelectors } from '../selectors/fantasy-football-team.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballTeamFacade extends GenericFacade({
  selectorClass: FantasyFootballTeamSelectors,
  actionHandler: FantasyFootballTeam,
}) {
  teamInfo$ = select(FantasyFootballTeamSelectors.getTeamInfoByTeamId);
  standings$ = select(FantasyFootballTeamSelectors.standings);

  teamPositions$ = select(FantasyFootballTeamSelectors.getTeamPositionsCount);

  teamFilterOptions$ = select(FantasyFootballTeamSelectors.getTeamFilterOptions);

  starters$ = select(FantasyFootballTeamSelectors.getTeamStarters);
  startersPoints$ = select(FantasyFootballTeamSelectors.getTeamStartersPoints);
  // startersLineupCard$ = select(FantasyFootballTeamSelectors.getTeamStartersLineupCard);

  playerStatsChartData$ = of(); // select(FantasyFootballTeamSelectors.getPlayerStatsChartData);

  starterStats$ = select(FantasyFootballTeamSelectors.getTeamStats);
  teamStatsByPositionId$ = select(FantasyFootballTeamSelectors.getTeamStatsByPositionId);

  bench$ = select(FantasyFootballTeamSelectors.getTeamBench);
  benchPoints$ = select(FantasyFootballTeamSelectors.getTeamBenchPoints);

  injuredReserve$ = select(FantasyFootballTeamSelectors.getTeamInjuredReserve);
}
