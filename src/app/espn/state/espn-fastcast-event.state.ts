import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

import { EspnFastcastService } from '../espn-fastcast.service';
import { EspnService } from '../espn.service';
import { FastcastEvent } from '../models/fastcast-event.model';
import { FastcastLeague } from '../models/fastcast-league.model';

export class PatchFastcastEvents {
  static readonly type = `[espnFastcastEvent] PatchFastcastEvents`;
  constructor(public payload: { map: { [id: string]: FastcastEvent } }) {}
}

export interface EspnFastcastEventStateModel {
  map: { [id: string]: FastcastEvent };
}

@State<EspnFastcastEventStateModel>({
  name: 'espnFastcastEvent',
  defaults: {
    map: {},
  },
})
@Injectable()
export class EspnFastcastEventState {
  constructor(private fastcastService: EspnFastcastService, private espnService: EspnService, private store: Store) {}

  @Selector()
  static selectMap(state: EspnFastcastEventStateModel): { [id: string]: FastcastEvent } {
    return state.map;
  }

  @Action(PatchFastcastEvents)
  PatchFastcastEvents({ patchState, getState }: StateContext<EspnFastcastEventStateModel>, { payload: { map } }: PatchFastcastEvents) {
    const state = getState();

    patchState({ ...state, map });
  }
}
