import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { UrlPathFragments } from '@app/@core/router/url-builder';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { DfsRouteBuilder, EspnRouteBuilder } from './route-builder';
import { SetRouterState } from './router.actions';
import { RouterSelector } from './router.selectors';

type NavigationComplete = NavigationEnd | NavigationCancel;

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  dailyFantasyMenu$ = select(RouterSelector.dailyFantasyMenu);
  espnFantasyMenu$ = select(RouterSelector.espnFantasyMenu);

  sport$ = select(RouterSelector.getSport);
  leagueId$ = select(RouterSelector.getLeagueId);
  seasonId$ = select(RouterSelector.getSeason);

  teamId$ = select(RouterSelector.getTeamId);
  dfsSite$ = select(RouterSelector.getDfsSite);

  isEspn$ = select(RouterSelector.showEspnNavigation);

  constructor(private store: Store, private router: Router) {}

  get leagueId(): string | null {
    return this.store.selectSnapshot(RouterSelector.getLeagueId);
  }

  get teamId(): string | null {
    return this.store.selectSnapshot(RouterSelector.getTeamId);
  }

  get playerId(): string | null {
    return this.store.selectSnapshot(RouterSelector.getPlayerId);
  }

  /**
   *  @deprecated find a better way to retrieve sport
   */
  get sport() {
    return this.store.selectSnapshot(RouterSelector.getSport);
  }

  get season(): string | null {
    return this.store.selectSnapshot(RouterSelector.getSeason);
  }

  get dfsSite(): UrlPathFragments {
    return this.store.selectSnapshot(RouterSelector.getDfsSite);
  }

  navigateEspn() {
    this.navigate([UrlPathFragments.Espn]);
  }

  navigateToMyProfile() {
    this.navigate([UrlPathFragments.MyProfile]);
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

  navigateToFantasyPlayer(playerId: string) {
    this.navigate(EspnRouteBuilder.playerPathFragments(this.sport, this.season, this.leagueId, playerId));
  }

  navigateToDraftkingsBySport(sport: string) {
    this.navigate(DfsRouteBuilder.sportPathFragments(sport), { queryParams: { site: 'draftkings' } });
  }

  setRouterStateParams(routerStateParams: any) {
    return this.store.dispatch([new SetRouterState({ routerStateParams })]);
  }

  private navigate(route: any[], opt?: NavigationExtras | undefined) {
    return this.router.navigate(route, opt);
  }
}
