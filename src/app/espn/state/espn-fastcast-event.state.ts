import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FastcastEventMap } from '../models/fastcast-event.model';

export class PatchFastcastEvents {
  static readonly type = `[espnFastcastEvent] PatchFastcastEvents`;
  constructor(public payload: { map: FastcastEventMap }) {}
}

export interface EspnFastcastEventStateModel {
  map: FastcastEventMap;
}

@State<EspnFastcastEventStateModel>({
  name: 'espnFastcastEvent',
  defaults: {
    map: {},
  },
})
@Injectable()
export class EspnFastcastEventState {
  constructor() {}

  @Selector()
  static selectMap(state: EspnFastcastEventStateModel): FastcastEventMap {
    return state.map;
  }

  @Action(PatchFastcastEvents)
  PatchFastcastEvents({ patchState, getState }: StateContext<EspnFastcastEventStateModel>, { payload: { map } }: PatchFastcastEvents) {
    const state = getState();

    patchState({ ...state, map });
  }
}
