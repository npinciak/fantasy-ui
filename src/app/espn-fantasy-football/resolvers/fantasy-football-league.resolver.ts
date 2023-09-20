import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RouterFacade } from '@app/@core/router/router.facade';
import { FantasyFootballLeagueFacade } from '../facade/fantasy-football-league.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueResolver implements Resolve<void> {
  constructor(readonly routerFacade: RouterFacade, readonly fantasyFootballFacade: FantasyFootballLeagueFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');
    const year = route.paramMap.get('year');
    if (leagueId && year) {
      await this.fantasyFootballFacade.getLeague(leagueId, year).toPromise();
    }
  }
}
