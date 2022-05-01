import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PatchFastcastLeague } from '../actions/espn-fastcast-league.actions';
import { FastcastLeagueMap } from '../models/fastcast-league.model';

export interface EspnFastcastLeagueStateModel {
  map: FastcastLeagueMap;
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
  static selectMap(state: EspnFastcastLeagueStateModel): FastcastLeagueMap {
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
