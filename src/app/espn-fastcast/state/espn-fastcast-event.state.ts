import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PatchFastcastEvents } from '../actions/espn-fastcast-event.actions';
import { FastcastEventMap } from '../models/fastcast-event.model';

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
