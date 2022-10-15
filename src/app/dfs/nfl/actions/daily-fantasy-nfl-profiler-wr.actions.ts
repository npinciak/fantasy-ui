import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

export const name = 'dailyFantasyNflProfilerWR';

export class SetPlayerNflProfilerWR {
  static readonly type = `[${name}] SetPlayerNflProfilerWR`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}

export class ClearAndAddNflProfilerWR {
  static readonly type = `[${name}] ClearAndAddNflProfilerWR`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}
