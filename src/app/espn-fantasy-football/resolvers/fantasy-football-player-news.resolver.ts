import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FantasyFootballPlayerCardFacade } from '../facade/fantasy-football-player-card.facade';
import { FantasyFootballPlayerNewsFacade } from '../facade/fantasy-football-player-news.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballPlayerNewsResolver implements Resolve<void> {
  constructor(
    private fantasyFootballPlayerNewsFacade: FantasyFootballPlayerNewsFacade,
    private fantasyFootballPlayerCardFacade: FantasyFootballPlayerCardFacade // ,
  ) // private fantasyFootballProTeamScheduleFacade: FantasyFootballProTeamScheduleFacade
  {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const playerId = route.paramMap.get('playerId');

    if (!playerId) throw new Error('cannot fetch a league without a playerId');

    this.fantasyFootballPlayerNewsFacade.getPlayerNews(playerId);
    this.fantasyFootballPlayerCardFacade.getPlayerCard(playerId);
    // this.fantasyFootballProTeamScheduleFacade.fetch();
  }
}
