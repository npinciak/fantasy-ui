import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FastcastLeague } from '../models/fastcast-league.model';

export type EspnFastcastLeagueModelMap = Record<string, FastcastLeague>;

export class PatchFastcastLeague {
  static readonly type = `[espnFastcastLeague] PatchFastcastLeague`;
  constructor(public payload: { map: EspnFastcastLeagueModelMap }) {}
}

export interface EspnFastcastLeagueStateModel {
  map: EspnFastcastLeagueModelMap;
}

@State<EspnFastcastLeagueStateModel>({
  name: 'espnFastcastLeagues',
  defaults: {
    map: {},
  },
})
@Injectable()
export class EspnFastcastLeagueState {
  constructor() {}

  @Selector()
  static selectMap(state: EspnFastcastLeagueStateModel): EspnFastcastLeagueModelMap {
    return state.map;
  }

  @Action(PatchFastcastLeague)
  patchFastcastLeague(
    { patchState, getState }: StateContext<EspnFastcastLeagueStateModel>,
    { payload: { map } }: PatchFastcastLeague
  ): void {
    const state = getState();

    patchState({ ...state, map });
  }
}
