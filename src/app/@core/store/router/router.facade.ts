import { Injectable } from '@angular/core';
import { UrlBuilder, UrlFragments } from '@app/@core/store/router/url-builder';
import { select } from '@app/@shared/models/typed-select';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { RouterSelector } from './router.selectors';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  sport$ = select(RouterSelector.getSport);

  leagueId$ = select(RouterSelector.leagueId);
  teamId$ = select(RouterSelector.teamId);

  constructor(private store: Store) {}

  get leagueId(): string | null {
    return this.store.selectSnapshot(RouterSelector.leagueId);
  }

  get teamId(): string | null {
    return this.store.selectSnapshot(RouterSelector.teamId);
  }

  get sport(): UrlFragments {
    return this.store.selectSnapshot(RouterSelector.getSport);
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

  navigateToFreeAgents(sport: UrlFragments, leagueId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnFreeAgents(sport, leagueId)));
  }

  navigateToTeam(sport: UrlFragments, leagueId: string | null, teamId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnTeam(sport, leagueId, teamId)));
  }

  navigateToEspnBaseballFreeAgents(leagueId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnMlbLeagueFreeAgents(leagueId)));
  }

  navigateToEspnBaseballTeam(leagueId: string | null, teamId: string | null) {
    return this.store.dispatch(new Navigate(UrlBuilder.espnMlbLeagueTeam(leagueId, teamId)));
  }
}
