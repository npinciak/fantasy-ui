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
  name: 'espnFastcastEvents',
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
  patchFastcastEvents(
    { patchState, getState }: StateContext<EspnFastcastEventStateModel>,
    { payload: { map } }: PatchFastcastEvents
  ): void {
    patchState({ ...getState(), map });
  }
}
