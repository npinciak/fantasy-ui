import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FantasyBaseballLeagueFacade } from '../facade/fantasy-baseball-league.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballResolver implements Resolve<void> {
  constructor(private fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');

    await this.fantasyBaseballLeagueFacade.getLeague(Number(leagueId)).toPromise();
  }
}
