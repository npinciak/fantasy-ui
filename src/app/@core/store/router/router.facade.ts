import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { UrlBuilder, UrlFragments } from '@app/@shared/url-builder';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { RouterSelector } from './router.selectors';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  leagueId$ = select(RouterSelector.leagueId);
  teamId$ = select(RouterSelector.teamId);

  constructor(private store: Store) {}

  get leagueId(): string | null {
    return this.store.selectSnapshot(RouterSelector.leagueId);
  }

  get teamId(): string | null {
    return this.store.selectSnapshot(RouterSelector.teamId);
  }

  navigateToEspnHome() {
    return this.store.dispatch(new Navigate([UrlBuilder.espnBaseUrl]));
  }

  navigateToEspnBaseballLeagueHome(leagueId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnMlbLeague(leagueId)));
  }

  navigateToLeagueHome(sport: UrlFragments, leagueId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnLeague(sport, leagueId)));
  }

  navigateToEspnBaseballFreeAgents(leagueId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnMlbLeagueFreeAgents(leagueId)));
  }

  navigateToEspnBaseballTeam(leagueId: string | null, teamId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnMlbLeagueTeam(leagueId, teamId)));
  }
}
