import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FantasyFootballFreeAgentsFacade } from '../facade/fantasy-football-free-agents.facade';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsResolver implements Resolve<void> {
  constructor(private freeAgentsFacade: FantasyFootballFreeAgentsFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');

    if (!leagueId) throw new Error(`cannot fetch a league without a leagueId`);

    await firstValueFrom(this.freeAgentsFacade.fetchFreeAgents(leagueId));
  }
}
