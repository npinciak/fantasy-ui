import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PlayerProfilerSeasonMap } from '../models/nfl-profiler.model';

export class PatchProfiler {
  static readonly type = `[nflDfsProfiler] PatchProfiler`;
  constructor(public payload: { profiler: PlayerProfilerSeasonMap }) {}
}

export class NflDfsProfilerStateModel {
  map: PlayerProfilerSeasonMap;
}

const defaults = {
  map: {},
};

@State<NflDfsProfilerStateModel>({
  name: 'nflDfsProfiler',
  defaults,
})
@Injectable()
export class NflDfsProfilerState {
  @Selector()
  static season(state: NflDfsProfilerStateModel): PlayerProfilerSeasonMap {
    return state.map;
  }

  @Action(PatchProfiler)
  async patchNFLProfiler({ getState, patchState }: StateContext<NflDfsProfilerStateModel>, { payload }: PatchProfiler): Promise<void> {
    const state = getState();
    patchState({ ...state, map: payload.profiler });
  }
}
