import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { FantasyFootballFreeAgents } from '../actions/fantasy-football-free-agents.actions';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsResolver implements Resolve<void> {
  constructor(private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');

    if (leagueId) {
      await this.store.dispatch(new FantasyFootballFreeAgents.Fetch({ leagueId })).toPromise();
    }
  }
}
