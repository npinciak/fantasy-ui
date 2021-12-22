import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NFLFacade } from '../facade/nfl.facade';

@Injectable({
  providedIn: 'root',
})
export class NFLLeagueResolver implements Resolve<void> {
  constructor(readonly nflFacade: NFLFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');
    await this.nflFacade.getLeague(leagueId).toPromise();
  }
}
