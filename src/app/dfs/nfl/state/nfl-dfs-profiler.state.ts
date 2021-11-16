import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ProfilerInfoQB, ProfilerInfoRB, ProfilerInfoReceiver } from '../models/nfl-slate-attr.model';
import { PatchProfiler } from './nfl-dfs-profiler.actions';

interface ProfilerInfo {
  season: { [id: string]: ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver };
  lastSeason: { [id: string]: ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver };
  combined: { [id: string]: ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver };
}

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
  static season(state: NflDfsProfilerStateModel) {
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
