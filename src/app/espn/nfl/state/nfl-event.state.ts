import { Injectable } from '@angular/core';
import { setMap } from '@app/@shared/operators';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { NflEvent } from '../models/nfl-event.model';

export class PatchEvents {
  static readonly type = `[nflEvents] PatchEvents`;
  constructor(public payload: { events: NflEvent[] }) {}
}

interface NflEventStateModel {
  map: { [id: string]: NflEvent };
}

@State<NflEventStateModel>({
  name: 'nflEvents',
  defaults: {
    map: {},
  },
})
@Injectable()
export class NflEventState {
  constructor() {}

  @Selector()
  static getEventMap(state: NflEventStateModel) {
    return state.map;
  }

  @Action(PatchEvents)
  patchEvents(ctx: StateContext<NflEventStateModel>, { payload: { events } }: PatchEvents) {
    ctx.setState(setMap(events, event => event.id));
  }
}
