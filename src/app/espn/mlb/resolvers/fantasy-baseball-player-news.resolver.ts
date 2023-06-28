import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FantasyBaseballPlayerCardFacade } from '../facade/fantasy-baseball-player-card.facade';
import { FantasyBaseballPlayerNewsFacade } from '../facade/fantasy-baseball-player-news.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballPlayerNewsResolver implements Resolve<void> {
  constructor(
    private fantasyBaseballPlayerNewsFacade: FantasyBaseballPlayerNewsFacade,
    private fantasyBaseballPlayerCardFacade: FantasyBaseballPlayerCardFacade
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const playerId = route.paramMap.get('playerId');

    if (!playerId) throw new Error('cannot fetch a league without a playerId');

    this.fantasyBaseballPlayerNewsFacade.getPlayerNews(playerId);
    this.fantasyBaseballPlayerCardFacade.getPlayerCard(playerId);
  }
}
