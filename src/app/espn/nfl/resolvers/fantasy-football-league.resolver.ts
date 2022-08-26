import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FantasyFootballLeagueFacade } from '../facade/fantasy-football-league.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueResolver implements Resolve<void> {
  constructor(readonly fantasyFootballFacade: FantasyFootballLeagueFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');
    if (leagueId) {
      await this.fantasyFootballFacade.getLeague(leagueId).toPromise();
    }
  }
}
