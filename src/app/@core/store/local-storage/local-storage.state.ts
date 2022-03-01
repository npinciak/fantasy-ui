import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class Set {
  static readonly type = `[sportsUiLocalStorage] PatchFastcastEvents`;
  constructor(public payload: { map: {} }) {}
}

export class Remove {
  static readonly type = `[sportsUiLocalStorage] PatchFastcastEvents`;
  constructor(public payload: { map: {} }) {}
}

export interface LocalStorageStateModel {
  map: {};
}

@State<LocalStorageStateModel>({
  name: 'sportsUiLocalStorage',
  defaults: {
    map: {},
  },
})
@Injectable()
export class LocalStorageState {
  @Selector()
  public static getState(state: LocalStorageStateModel) {
    return state;
  }

  @Action(Set)
  setStorage({ patchState, getState }: StateContext<LocalStorageStateModel>, { payload: { map } }: Set) {
    const state = getState();

    patchState({ ...state, map });
  }

  @Action(Remove)
  removeStorage({ patchState, getState }: StateContext<LocalStorageStateModel>, { payload: { map } }: Remove) {
    const state = getState();

    patchState({ ...state, map });
  }
}
