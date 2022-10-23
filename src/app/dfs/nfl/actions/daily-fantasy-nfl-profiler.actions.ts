import { PlayerProfilerSeasonMap } from '../models/nfl-profiler.model';

export const name = 'dailyFantasyNflProfiler';

export class SetProfiler {
  static readonly type = `[${name}] SetProfiler`;
  constructor(public payload: { profiler: PlayerProfilerSeasonMap }) {}
}

export class ClearAndAddProfiler {
  static readonly type = `[${name}] ClearAndAddProfiler`;
  constructor(public payload: { profiler: PlayerProfilerSeasonMap }) {}
}
