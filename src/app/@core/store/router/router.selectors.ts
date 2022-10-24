import { Params } from '@angular/router';
import { objectIsEmpty } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { RouterState, RouterStateModel as RouterStateOuterModel } from '@ngxs/router-plugin';
import { RouterStateModel } from './router-state.model';

export class RouterSelector {
  constructor() {}

  @Selector([RouterState])
  static getRouterStateRoot({ state }: RouterStateOuterModel<RouterStateModel>) {
    return state;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterParams(state: RouterStateModel | undefined) {
    return state?.params;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouterQueryParams(state: RouterStateModel | undefined) {
    return state?.queryParams;
  }

  @Selector([RouterSelector.getRouterStateRoot])
  static getRouteData(state: RouterStateModel | undefined) {
    return state?.data;
  }

  @Selector([RouterSelector.getRouterParams])
  static getLeagueId(params: Params | undefined) {
    return objectIsEmpty(params) ? null : (params?.leagueId as string);
  }

  @Selector([RouterSelector.getRouterParams])
  static getTeamId(params: Params | undefined) {
    return objectIsEmpty(params) ? null : (params?.teamId as string);
  }

  @Selector([RouterSelector.getRouteData])
  static getSport(data: any) {
    return data.sport;
  }

  @Selector([RouterSelector.getLeagueId, RouterSelector.getTeamId])
  static invalidRoutes(leagueId: string | null, teamId: string | null) {
    return leagueId || teamId ? true : false;
  }
}
