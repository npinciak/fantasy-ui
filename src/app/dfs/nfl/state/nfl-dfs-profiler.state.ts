import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  NFLClientProfilerQBProperties,
  NFLClientProfilerRBProperties,
  NFLClientProfilerReceiverProperties,
  NFLClientStatGroup,
} from '../models/nfl-client.model';

export class PatchProfiler {
  static readonly type = `[nflDfsProfiler] PatchProfiler`;
  constructor(public payload: { profiler: NFLClientStatGroup }) {}
}

interface ProfilerInfo {
  season: ProfilerInfoMap;
  lastSeason: ProfilerInfoMap;
  combined: ProfilerInfoMap;
}

export type ProfilerInfoMap = Record<
  string,
  NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
>;

export class NflDfsProfilerStateModel {
  qb: ProfilerInfo;
  rb: ProfilerInfo;
  wr: ProfilerInfo;
  te: ProfilerInfo;
}

const defaultProfiler = { season: {}, lastSeason: {}, combined: {} };

const defaults = {
  qb: defaultProfiler,
  rb: defaultProfiler,
  wr: defaultProfiler,
  te: defaultProfiler,
};

@State<NflDfsProfilerStateModel>({
  name: 'nflDfsProfiler',
  defaults,
})
@Injectable()
export class NflDfsProfilerState {
  @Selector()
  static season(state: NflDfsProfilerStateModel): ProfilerInfoMap {
    return { ...state.qb.season, ...state.rb.season, ...state.te.season, ...state.wr.season };
  }

  @Action(PatchProfiler)
  async patchNFLProfiler(ctx: StateContext<NflDfsProfilerStateModel>, { payload }: PatchProfiler): Promise<void> {
    const qb = {
      season: { ...payload?.profiler.qb.profiler.season },
      lastSeason: { ...payload?.profiler.qb.profiler['last-season'] },
      combined: { ...payload?.profiler.qb.profiler.combined },
    };

    const rb = {
      season: { ...payload?.profiler.rb.profiler.season },
      lastSeason: { ...payload?.profiler.rb.profiler['last-season'] },
      combined: { ...payload?.profiler.rb.profiler.combined },
    };

    const wr = {
      season: { ...payload?.profiler.wr.profiler.season },
      lastSeason: { ...payload?.profiler.wr.profiler['last-season'] },
      combined: { ...payload?.profiler.wr.profiler.combined },
    };

    const te = {
      season: { ...payload?.profiler.te.profiler.season },
      lastSeason: { ...payload?.profiler.te.profiler['last-season'] },
      combined: { ...payload?.profiler.te.profiler.combined },
    };

    ctx.patchState({ qb, rb, wr, te });
  }
}
