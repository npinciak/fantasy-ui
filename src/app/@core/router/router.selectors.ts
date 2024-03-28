import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { ShellNavListItem } from '@app/@core/shell/shell-nav-list/shell-nav-list.model';
import { objectIsEmpty } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { SITE } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { EspnRouteBuilder } from './route-builder';
import { RouterStateModel } from './router-state.model';
import { RouterState } from './router.state';
import { UrlPathFragments } from './url-builder';

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

  @Selector([RouterSelector.getRouterParams])
  static getPlayerId(params: Params | undefined) {
    return objectIsEmpty(params) ? null : (params?.playerId as string);
  }

  /**
   *  @deprecated find a better way to retrieve sport
   */
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
  static dailyFantasyMenu(): ShellNavListItem[] {
    return [
      { id: '1', routerLink: [UrlPathFragments.Dfs, UrlPathFragments.MLB], queryParams: { site: SITE.Draftkings }, label: 'DK MLB' },
      { id: '2', routerLink: [UrlPathFragments.Dfs, UrlPathFragments.NFL], queryParams: { site: SITE.Draftkings }, label: 'DK NFL' },
    ];
  }

  @Selector([RouterSelector.getSport, RouterSelector.getSeason, RouterSelector.getLeagueId, RouterSelector.getTeamId])
  static espnFantasyMenu(
    sport: UrlPathFragments,
    season: string | null,
    leagueId: string | null,
    teamId: string | null
  ): ShellNavListItem[] {
    const baseNavLinks = [{ id: '1', routerLink: ['/espn'], label: 'Home' }];

    const leagueNavLinks = [
      { id: '3', routerLink: EspnRouteBuilder.leaguePathFragments(sport, season, leagueId), label: 'League Home' },
      { id: '4', routerLink: EspnRouteBuilder.freeAgentsPathFragments(sport, season, leagueId), label: 'Free Agents' },
    ];

    const fantasyBaseballTeamLinks = [
      { id: '5', routerLink: EspnRouteBuilder.teamPathFragments(sport, season, leagueId, teamId), label: 'Team' },
      { id: '6', routerLink: EspnRouteBuilder.teamPitchersPathFragments(sport, season, leagueId, teamId), label: 'Pitchers' },
      { id: '7', routerLink: EspnRouteBuilder.teamBattersPathFragments(sport, season, leagueId, teamId), label: 'Batters' },
    ];

    const showFantasyLeagueLinks = (sport === UrlPathFragments.Baseball || sport === UrlPathFragments.Football) && exists(leagueId);
    const showFantasyBaseballPositionLinks = sport === UrlPathFragments.Baseball && exists(teamId);

    return showFantasyBaseballPositionLinks
      ? [...baseNavLinks, ...leagueNavLinks, ...fantasyBaseballTeamLinks]
      : showFantasyLeagueLinks
      ? [...baseNavLinks, ...leagueNavLinks]
      : baseNavLinks;
  }
}
