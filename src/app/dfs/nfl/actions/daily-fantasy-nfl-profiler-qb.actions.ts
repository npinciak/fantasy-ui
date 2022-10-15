import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

export const name = 'dailyFantasyNflProfilerQB';

export class SetNflProfilerQB {
  static readonly type = `[${name}] SetNflProfilerQB`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}

export class ClearAndAddNflProfilerQB {
  static readonly type = `[${name}] ClearAndAddNflProfilerQB`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}
