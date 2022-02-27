import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

export interface LocalStorageStateModel {}

@State<LocalStorageStateModel>({
  name: 'sportsUiLocalStorage',
  defaults: {},
})
@Injectable()
export class LocalStorageState {
  @Selector()
  public static getState(state: LocalStorageStateModel) {
    return state;
  }
}
