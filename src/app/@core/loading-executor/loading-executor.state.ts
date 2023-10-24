import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SetActionCount } from './loading-executer.actions';

export interface LoadingExecutorStateModel {
  [action: string]: number;
}

@State<LoadingExecutorStateModel>({
  name: 'ngxs_actions_executing',
})
@Injectable()
export class LoadingExecutorState {
  @Action(SetActionCount)
  setActionCount({ patchState }: StateContext<LoadingExecutorStateModel>, { payload: { actionType, count } }: SetActionCount) {
    patchState({ [actionType]: count });
  }
}
