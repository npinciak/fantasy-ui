import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { UrlBuilder, UrlPathFragments } from '@app/@core/store/router/url-builder';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { EspnRouteBuilder } from './route-builder';
import { RouterSelector } from './router.selectors';

type NavigationComplete = NavigationEnd | NavigationCancel;

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  sport$ = select(RouterSelector.getSport);
  leagueId$ = select(RouterSelector.getLeagueId);
  seasonId$ = select(RouterSelector.getSeason);

  teamId$ = select(RouterSelector.getTeamId);
  dfsSite$ = select(RouterSelector.getDfsSite);
  dfsSport$ = select(RouterSelector.getDfsSport);

  isEspn$ = select(RouterSelector.showEspnNavigation);

  constructor(private store: Store, private router: Router) {}

  get leagueId(): string | null {
    return this.store.selectSnapshot(RouterSelector.getLeagueId);
  }

  get teamId(): string | null {
    return this.store.selectSnapshot(RouterSelector.getTeamId);
  }

  get sport() {
    return this.store.selectSnapshot(RouterSelector.getSport);
  }

  get season(): string | null {
    return this.store.selectSnapshot(RouterSelector.getSeason);
  }

  get dfsSite(): UrlPathFragments {
    return this.store.selectSnapshot(RouterSelector.getDfsSite);
  }

  get dfsSport(): UrlPathFragments {
    return this.store.selectSnapshot(RouterSelector.getDfsSport);
  }

  navigateToMyProfile() {
    this.navigate([UrlPathFragments.MyProfile]);
  }

  /**
   * @deprecated
   */
  navigateToEspnHome() {
    this.navigate([UrlBuilder.espnBaseUrl]);
  }

  navigateToFantasyLeagueHome(sport: string, season: string, leagueId: string) {
    this.navigate(EspnRouteBuilder.leaguePathFragments(sport, season, leagueId));
  }

  navigateToFantasyTeam(teamId: string) {
    this.navigate(EspnRouteBuilder.teamPathFragments(this.sport, this.season, this.leagueId, teamId));
  }

  navigateToFantasyFreeAgents() {
    this.navigate(EspnRouteBuilder.freeAgentsPathFragments(this.sport, this.season, this.leagueId));
  }

  /**
   * @deprecated
   */
  navigateToEspnBaseballLeagueHome(leagueId: string | null) {
    this.navigate(UrlBuilder.espnMlbLeague(leagueId));
  }

  /**
   * @deprecated
   */
  navigateToFootballLeagueHome(leagueId: string, year: string) {
    this.navigate([]); //EspnFootballRouteBuilder.leaguePath(year, leagueId));
  }

  /**
   * @deprecated
   */
  navigateToFootballFreeAgents(leagueId: string, year: string) {
    this.navigate([]);
  }

  /**
   * @deprecated
   */
  navigateToFootballTeam(teamId: string | null) {
    const leagueId = this.leagueId;
    const year = this.season;

    this.navigate([]);
  }

  /**
   * @deprecated
   */
  navigateToTeam(teamId: string | null) {
    const leagueId = this.leagueId;
    const year = this.season;

    this.navigate([]);
  }

  /**
   * @deprecated
   */
  navigateToEspnBaseballFreeAgents(leagueId: string | null) {
    this.navigate(UrlBuilder.espnMlbLeagueFreeAgents(leagueId));
  }

  /**
   * @deprecated
   */
  navigateToEspnBaseballTeam(leagueId: string | null, teamId: string | null) {
    this.navigate(UrlBuilder.espnMlbLeagueTeam(leagueId, teamId));
  }

  /**
   * @deprecated
   */
  navigateDfs(sport: UrlPathFragments, site: string) {
    this.navigate(UrlBuilder.dfsSlates(sport, site), { queryParams: { sport: sport, site: site } });
  }

  private navigate(route: any[], opt?: NavigationExtras | undefined) {
    return this.router.navigate(route, opt);
  }
}

// create a jasmine test for navigateToEspnBaseballTeam
