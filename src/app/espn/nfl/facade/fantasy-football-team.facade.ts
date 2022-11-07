import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyFootballTeamSelectors } from '../selectors/fantasy-football-team.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballTeamFacade extends GenericFacade(FantasyFootballTeamSelectors) {
  teamPositions$ = select(FantasyFootballTeamSelectors.getTeamPositionsCount);

  starters$ = select(FantasyFootballTeamSelectors.getTeamStarters);
  startersPoints$ = select(FantasyFootballTeamSelectors.getTeamStartersPoints);

  starterStats$ = select(FantasyFootballTeamSelectors.getTeamStats);
  teamStatsByPositionId$ = select(FantasyFootballTeamSelectors.getTeamStatsByPositionId);

  bench$ = select(FantasyFootballTeamSelectors.getTeamBench);
  benchPoints$ = select(FantasyFootballTeamSelectors.getTeamBenchPoints);

  injuredReserve$ = select(FantasyFootballTeamSelectors.getTeamInjuredReserve);
}
