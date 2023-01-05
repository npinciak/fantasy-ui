import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
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
  constructor(private store: Store) {}

  @Action(SetRouterState)
  async setState({ patchState }: StateContext<RouterStateModel>, { payload: { routerStateParams } }: SetRouterState): Promise<void> {
    patchState({ state: routerStateParams });
    // for (const key in routerStateParams.data) {
    //   const value = routerStateParams.data[key];
    //   //   if (IsNonBlockingResolverResult(value)) {
    //   //     await this.store.dispatch(new SetIsResolverFinished({ name: value.resolverName, isFinished: false })).toPromise();
    //   //     value.request
    //   //       .toPromise()
    //   //       .finally(() => this.store.dispatch(new SetIsResolverFinished({ name: value.resolverName, isFinished: true })));
    //   //   }
    // }
  }
}
