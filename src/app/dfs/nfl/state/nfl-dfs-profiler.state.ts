import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PlayerProfilerEntityMap } from '../models/nfl-profiler.model';

export class PatchProfiler {
  static readonly type = `[nflDfsProfiler] PatchProfiler`;
  constructor(public payload: { profiler: PlayerProfilerEntityMap }) {}
}

export class NflDfsProfilerStateModel {
  map: PlayerProfilerEntityMap;
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
  static season(state: NflDfsProfilerStateModel): PlayerProfilerEntityMap {
    return; //{ ...state.qb.season, ...state.rb.season, ...state.te.season, ...state.wr.season };
  }

  @Action(PatchProfiler)
  async patchNFLProfiler({ getState, patchState }: StateContext<NflDfsProfilerStateModel>, { payload }: PatchProfiler): Promise<void> {
    const state = getState();
    patchState({ ...state, map: payload.profiler });

    // const qb = {
    //   season: { ...payload?.profiler.qb.profiler.season },
    //   lastSeason: { ...payload?.profiler.qb.profiler['last-season'] },
    //   combined: { ...payload?.profiler.qb.profiler.combined },
    // };

    // const rb = {
    //   season: { ...payload?.profiler.rb.profiler.season },
    //   lastSeason: { ...payload?.profiler.rb.profiler['last-season'] },
    //   combined: { ...payload?.profiler.rb.profiler.combined },
    // };

    // const wr = {
    //   season: { ...payload?.profiler.wr.profiler.season },
    //   lastSeason: { ...payload?.profiler.wr.profiler['last-season'] },
    //   combined: { ...payload?.profiler.wr.profiler.combined },
    // };

    // const te = {
    //   season: { ...payload?.profiler.te.profiler.season },
    //   lastSeason: { ...payload?.profiler.te.profiler['last-season'] },
    //   combined: { ...payload?.profiler.te.profiler.combined },
    // };

    // ctx.patchState({ qb, rb, wr, te });
  }
}
