import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

export const name = 'dailyFantasyNflProfilerRB';

export class SetNflProfilerRB {
  static readonly type = `[${name}] SetNflProfilerRB`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}

export class ClearAndAddNflProfilerRB {
  static readonly type = `[${name}] ClearAndAddNflProfilerRB`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}
