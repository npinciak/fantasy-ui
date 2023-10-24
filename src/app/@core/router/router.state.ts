import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { RouterStateModel } from './router-state.model';

export class SetRouterState {
  public static readonly type = `[router] SetRouterState`;
  constructor(public payload: { routerStateParams }) {}
}

@State<RouterStateModel>({
  name: 'router',
  defaults: {
    state: undefined,
  },
})
@Injectable()
export class RouterState {
  constructor() {}

  @Action(SetRouterState)
  setState({ patchState }: StateContext<RouterStateModel>, { payload: { routerStateParams } }: SetRouterState) {
    patchState({ state: routerStateParams });
  }
}
