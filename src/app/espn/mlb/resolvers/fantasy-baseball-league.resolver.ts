import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FantasyBaseballLeagueFacade } from '../facade/fantasy-baseball-league.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballLeagueResolver implements Resolve<void> {
  constructor(private fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');
    const year = route.paramMap.get('year');

    if (!leagueId) throw new Error('cannot fetch a league without a leagueId');
    if (!year) throw new Error('cannot fetch a league without a year');

    await this.fantasyBaseballLeagueFacade.getLeague(leagueId, year).toPromise();
  }
}