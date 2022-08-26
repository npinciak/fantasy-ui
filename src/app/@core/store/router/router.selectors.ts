import { Params } from '@angular/router';
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

  @Selector([RouterSelector.getRouterParams])
  static leagueId(params: Params | undefined) {
    return params?.leagueId;
  }

  @Selector([RouterSelector.getRouterParams])
  static teamId(params: Params | undefined) {
    return params?.teamId;
  }
}
