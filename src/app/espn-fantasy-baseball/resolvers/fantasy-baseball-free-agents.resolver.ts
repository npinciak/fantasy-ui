import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FantasyBaseballFreeAgentsFacade } from '../facade/fantasy-baseball-free-agents.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsResolver implements Resolve<void> {
  constructor(private fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');

    if (!leagueId) throw new Error('cannot fetch a league without a leagueId');

    this.fantasyBaseballFreeAgentsFacade.fetch(leagueId);
  }
}
