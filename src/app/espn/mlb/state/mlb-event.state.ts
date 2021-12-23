import { Injectable } from '@angular/core';
import { setMap } from '@app/@shared/operators';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { MlbEvent } from '../models/mlb-event.model';

export class PatchEvents {
  static readonly type = `[mlbEvents] PatchEvents`;
  constructor(public payload: { events: MlbEvent[] }) {}
}

interface MlbEventStateModel {
  map: { [id: string]: MlbEvent };
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

  @Action(PatchEvents)
  patchEvents(ctx: StateContext<MlbEventStateModel>, { payload: { events } }: PatchEvents) {
    ctx.setState(setMap(events, event => event.id));
  }
}
