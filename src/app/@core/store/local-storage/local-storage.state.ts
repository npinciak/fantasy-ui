import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

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
  [key in LocalStorageKeys]?: string | null;
};

@State<LocalStorageStateModel>({
  name: 'sportsUiLocalStorage',
  defaults: {},
})
@Injectable()
export class LocalStorageState {
  constructor() {}

  @Action(SetLocalStorageValue)
  setLocalStorageValue(
    { patchState, getState }: StateContext<LocalStorageStateModel>,
    { payload: { key, value } }: SetLocalStorageValue
  ): void {
    const state = getState();
    patchState({ ...state, [key]: value });
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
