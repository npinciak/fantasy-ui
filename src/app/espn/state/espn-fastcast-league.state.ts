import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { FastcastLeague } from '../models/fastcast-league.model';

export class PatchFastcastLeague {
  static readonly type = `[espnFastcastLeague] PatchFastcastLeague`;
  constructor(public payload: { map: { [id: string]: FastcastLeague } }) {}
}

export interface EspnFastcastLeagueModel {
  map: { [id: string]: FastcastLeague };
}

@State<EspnFastcastLeagueModel>({
  name: 'espnFastcastLeague',
  defaults: {
    map: {},
  },
})
@Injectable()
export class EspnFastcastLeagueState {
  constructor() {}

  @Selector()
  static selectMap(state: EspnFastcastLeagueModel): { [id: string]: FastcastLeague } {
    return state.map;
  }

  @Action(PatchFastcastLeague)
  patchFastcastLeague({ patchState, getState }: StateContext<EspnFastcastLeagueModel>, { payload: { map } }: PatchFastcastLeague) {
    const state = getState();

    patchState({ ...state, map });
  }
}
