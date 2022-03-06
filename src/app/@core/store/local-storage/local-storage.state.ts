import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class SetLocalStorageValue {
  static readonly type = '[sportsUiLocalStorage] SetLocalStorageValue';
  constructor(public payload: { key: LocalStorageKeys; value: string }) {}
}
export class RemoveLocalStorageValue {
  static readonly type = '[sportsUiLocalStorage] RemoveLocalStorageValue';
  constructor(public payload: { key: LocalStorageKeys; value: string }) {}
}

export enum LocalStorageKeys {
  UserLeagues = '@@_user_leagues',
}

export type LocalStorageStateModel = {
  [key in LocalStorageKeys]?: string;
};

@State<LocalStorageStateModel>({
  name: 'sportsUiLocalStorage',
  defaults: {},
})
@Injectable()
export class LocalStorageState {
  @Selector([LocalStorageState])
  static getLocalStorageValue(state: LocalStorageStateModel): (id: LocalStorageKeys) => string | null {
    return (key: LocalStorageKeys) => state[key] ?? null;
  }

  constructor() {}

  @Action(SetLocalStorageValue)
  setLocalStorageValue({ patchState }: StateContext<LocalStorageStateModel>, { payload: { key, value } }: SetLocalStorageValue): void {
    patchState({ [key]: value });
  }

  @Action(RemoveLocalStorageValue)
  removeLocalStorageValue(
    { patchState, getState }: StateContext<LocalStorageStateModel>,
    { payload: { key, value } }: RemoveLocalStorageValue
  ): void {
    const state = getState();
    patchState({ ...state, [key]: null });
  }
}
