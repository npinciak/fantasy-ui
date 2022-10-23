import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

export const name = 'dailyFantasyNflProfilerTE';

export class SetNflProfilerTE {
  static readonly type = `[${name}] SetNflProfilerTE`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}

export class ClearAndAddNflProfilerTE {
  static readonly type = `[${name}] ClearAndAddNflProfilerTE`;
  constructor(public payload: PlayerProfilerSeason[]) {}
}
