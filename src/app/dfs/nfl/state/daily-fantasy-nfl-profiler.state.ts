import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { name, SetProfiler } from '../actions/daily-fantasy-nfl-profiler.actions';
import { PlayerProfilerSeasonMap } from '../models/nfl-profiler.model';

export class DailyFantasyNflProfilerStateModel {
  map: PlayerProfilerSeasonMap;
}

const defaults = {
  map: {},
};

@State<DailyFantasyNflProfilerStateModel>({
  name,
  defaults,
})
@Injectable()
export class DailyFantasyNflProfilerState {
  @Selector()
  static season(state: DailyFantasyNflProfilerStateModel): PlayerProfilerSeasonMap {
    return state.map;
  }

  @Action(SetProfiler)
  async patchNFLProfiler(
    { getState, patchState }: StateContext<DailyFantasyNflProfilerStateModel>,
    { payload }: SetProfiler
  ): Promise<void> {
    const state = getState();
    patchState({ ...state, map: payload.profiler });
  }
}
