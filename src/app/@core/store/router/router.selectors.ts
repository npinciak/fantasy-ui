import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { objectIsEmpty } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists } from '@app/@shared/utilities/utilities.m';
// import { RouterState, RouterStateModel as RouterStateOuterModel } from '@ngxs/router-plugin';
import { DfsSite } from '@sports-ui/ui-sdk/dfs';
import { EspnRouteBuilder } from './route-builder';
import { RouterStateModel } from './router-state.model';
import { RouterState } from './router.state';
import { UrlBuilder, UrlPathFragments } from './url-builder';

export class RouterSelector {
  constructor() {}

  @Selector([RouterState])
  static getRouterStateRoot(state: RouterStateModel) {
    return state.state;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterUrl(
    state:
      | {
          url: string;
          params: Params | undefined;
          queryParams: Params;
          snapshot: ActivatedRouteSnapshot;
          data: { reuse: boolean; sport: UrlPathFragments };
        }
      | undefined
  ) {
    return state?.url;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterParams(
    state:
      | {
          url: string;
          params: Params | undefined;
          queryParams: Params;
          snapshot: ActivatedRouteSnapshot;
          data: { reuse: boolean; sport: UrlPathFragments };
        }
      | undefined
  ) {
    return state?.params;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterData(
    state:
      | {
          url: string;
          params: Params | undefined;
          queryParams: Params;
          snapshot: ActivatedRouteSnapshot;
          data: { reuse: boolean; sport: UrlPathFragments };
        }
      | undefined
  ) {
    return state?.data;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterQueryParams(
    state:
      | {
          url: string;
          params: Params | undefined;
          queryParams: Params;
          snapshot: ActivatedRouteSnapshot;
          data: { reuse: boolean; sport: UrlPathFragments };
        }
      | undefined
  ) {
    return state?.queryParams;
  }

  @Selector([RouterSelector.getRouterParams])
  static getLeagueId(params: Params | undefined) {
    return objectIsEmpty(params) ? null : (params?.leagueId as string);
  }

  @Selector([RouterSelector.getRouterParams])
  static getTeamId(params: Params | undefined) {
    return objectIsEmpty(params) ? null : (params?.teamId as string);
  }

  @Selector([RouterSelector.getRouterData])
  static getSport(data: { reuse: boolean; sport: UrlPathFragments } | undefined) {
    if (!exists(data) || !exists(data.sport)) return null;
    return data.sport;
  }

  @Selector([RouterSelector.getRouterParams])
  static getSeason(params: Params | undefined) {
    return objectIsEmpty(params) ? null : (params?.year as string);
  }

  @Selector([RouterSelector.getRouterQueryParams])
  static getDfsSite(queryParams: Params | undefined) {
    if (!exists(queryParams) || !exists(queryParams.site)) return;

    return queryParams.site;
  }

  @Selector([RouterSelector.getLeagueId, RouterSelector.getTeamId])
  static invalidRoutes(leagueId: string | null, teamId: string | null) {
    return leagueId || teamId ? true : false;
  }

  @Selector([RouterSelector.getRouterUrl, RouterSelector.getLeagueId])
  static showEspnNavigation(url: string, leagueId: string | null) {
    return url.split('/')[1] === UrlPathFragments.Espn && exists(leagueId);
  }

  @Selector()
  static dailyFantasyMenu() {
    return [
      { id: '1', routerLink: UrlBuilder.dfsMlbBase, queryParams: { site: DfsSite.Draftkings }, label: 'DK MLB' },
      // { routerLink: UrlBuilder.dfsNbaBase, queryParams: { site:  site:DfsSite.Draftkings }, label: 'DK NFL' },
      // { routerLink: UrlBuilder.dfsNflBase, queryParams: { site: DfsSite.Draftkings }, label: 'DK NFL' },
    ];
  }

  @Selector([RouterSelector.getSport, RouterSelector.getSeason, RouterSelector.getLeagueId])
  static espnFantasyMenu(sport: UrlPathFragments, season: string | null, leagueId: string | null) {
    return [
      { id: '1', routerLink: ['/espn'], label: 'Home' },
      { id: '2', routerLink: EspnRouteBuilder.leaguePathFragments(sport, season, leagueId), label: 'League Home' },
      { id: '3', routerLink: EspnRouteBuilder.freeAgentsPathFragments(sport, season, leagueId), label: 'Free Agents' },
    ].filter(m => (!sport ? m.id === '1' : m));
  }
}
