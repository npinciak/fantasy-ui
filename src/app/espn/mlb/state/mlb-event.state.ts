import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';

import { EspnClientEvent } from '../interface';

interface MlbEventStateModel {
  map: { [id: string]: EspnClientEvent };
}

@State<MlbEventStateModel>({
  name: 'mlbEvents',
  defaults: {
    map: {},
  },
})
@Injectable()
export class MlbEventState {
  constructor() {}

  @Selector()
  static getEventMap(state: MlbEventStateModel) {
    return state.map;
  }
}
