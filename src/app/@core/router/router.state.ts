import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { INITIAL_STATE, RouterStateModel } from './router-state.model';
import { SetRouterState } from './router.actions';

@State<RouterStateModel>({
  name: 'router',
  defaults: INITIAL_STATE,
})
@Injectable()
export class RouterState {
  @Action(SetRouterState)
  setState({ patchState }: StateContext<RouterStateModel>, { payload: { routerStateParams } }: SetRouterState) {
    patchState({ state: routerStateParams });
  }
}
