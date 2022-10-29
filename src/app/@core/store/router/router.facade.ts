import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlBuilder, UrlFragments } from '@app/@core/store/router/url-builder';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { RouterSelector } from './router.selectors';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  sport$ = select(RouterSelector.getSport);
  leagueId$ = select(RouterSelector.getLeagueId);
  teamId$ = select(RouterSelector.getTeamId);

  constructor(private store: Store, private router: Router) {}

  get leagueId(): string | null {
    return this.store.selectSnapshot(RouterSelector.getLeagueId);
  }

  get teamId(): string | null {
    return this.store.selectSnapshot(RouterSelector.getTeamId);
  }

  get sport(): UrlFragments {
    return this.store.selectSnapshot(RouterSelector.getSport);
  }

  navigateToEspnHome() {
    this.navigate([UrlBuilder.espnBaseUrl]);
  }

  navigateToEspnBaseballLeagueHome(leagueId: string | null) {
    this.navigate(UrlBuilder.espnMlbLeague(leagueId));
  }

  navigateToLeagueHome(sport: UrlFragments, leagueId: string | null) {
    this.navigate(UrlBuilder.espnLeague(sport, leagueId));
  }

  navigateToFreeAgents(sport: UrlFragments, leagueId: string | null) {
    this.navigate(UrlBuilder.espnFreeAgents(sport, leagueId));
  }

  navigateToEspnFootballTeam(leagueId: string | null, teamId: string | null) {
    this.navigate(UrlBuilder.espnTeam(UrlFragments.NFL, leagueId, teamId));
  }

  navigateToTeam(sport: UrlFragments, leagueId: string | null, teamId: string | null) {
    this.navigate(UrlBuilder.espnTeam(sport, leagueId, teamId));
  }

  navigateToEspnBaseballFreeAgents(leagueId: string | null) {
    this.navigate(UrlBuilder.espnMlbLeagueFreeAgents(leagueId));
  }

  navigateToEspnBaseballTeam(leagueId: string | null, teamId: string | null) {
    this.navigate(UrlBuilder.espnMlbLeagueTeam(leagueId, teamId));
  }

  navigateDfs(sport: UrlFragments, site: string) {
    this.navigate(UrlBuilder.dfsSlates(sport, site), { queryParams: { sport: sport, site: site } });
  }

  private navigate(route: any[], opt?: any) {
    return this.router.navigate(route, opt);
  }
}
