import { Params } from '@angular/router';
import { exists, objectIsEmpty } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { RouterState, RouterStateModel as RouterStateOuterModel } from '@ngxs/router-plugin';
import { RouterStateModel } from './router-state.model';
import { UrlFragments } from './url-builder';

export class RouterSelector {
  constructor() {}

  @Selector([RouterState])
  static getRouterStateRoot({ state }: RouterStateOuterModel<RouterStateModel>) {
    return state;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterUrl(state: RouterStateModel | undefined) {
    return state?.url;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterParams(state: RouterStateModel | undefined) {
    return state?.params;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterData(state: RouterStateModel | undefined) {
    return state?.data;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterQueryParams(state: RouterStateModel | undefined) {
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
  static getSport(params: any) {
    if (!exists(params) || !exists(params.sport)) {
      return;
    }
    return params.sport;
  }

  @Selector([RouterSelector.getRouterQueryParams])
  static getDfsSport(queryParams: Params | undefined) {
    if (!exists(queryParams) || !exists(queryParams.sport)) {
      return;
    }

    return queryParams.sport;
  }

  @Selector([RouterSelector.getRouterQueryParams])
  static getDfsSite(queryParams: Params | undefined) {
    if (!exists(queryParams) || !exists(queryParams.site)) {
      return;
    }
    return queryParams.site;
  }

  @Selector([RouterSelector.getLeagueId, RouterSelector.getTeamId])
  static invalidRoutes(leagueId: string | null, teamId: string | null) {
    return leagueId || teamId ? true : false;
  }

  @Selector([RouterSelector.getRouterUrl, RouterSelector.getLeagueId])
  static showEspnNavigation(url: string, leagueId: string | null) {
    return url.split('/')[1] === UrlFragments.Espn && exists(leagueId);
  }
}
