import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FantasyFootballFreeAgentsFacade } from '../facade/fantasy-football-free-agents.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsResolver implements Resolve<void> {
  constructor(private freeAgentsFacade: FantasyFootballFreeAgentsFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');
    const season = route.paramMap.get('season');

    if (leagueId && season) {
      await this.freeAgentsFacade.fetchFreeAgents(leagueId, season).toPromise();
    }
  }
}
