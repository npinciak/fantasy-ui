import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SetActionCount } from './loading-executer.actions';
import { LoadingExecutorStateModel } from './loading-executor.model';

@State<LoadingExecutorStateModel>({
  name: 'loadingExecutor',
})
@Injectable()
export class LoadingExecutorState {
  @Action(SetActionCount)
  setActionCount({ patchState }: StateContext<LoadingExecutorStateModel>, { payload: { actionType, count } }: SetActionCount) {
    patchState({ [actionType]: count });
  }
}
