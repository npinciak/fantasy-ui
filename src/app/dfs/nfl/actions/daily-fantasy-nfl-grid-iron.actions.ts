import { GridIronPlayer } from '../models/nfl-gridIron.model';

export const name = 'dailyFantasyNflGridIron';

export class PatchGridIronPlayer {
  static readonly type = `[${name}] PatchGridIronPlayer`;
  constructor(public payload: GridIronPlayer[]) {}
}

export class ClearAndAddGridIronPlayer {
  static readonly type = `[${name}] ClearAndAddGridIronPlayer`;
  constructor(public payload: GridIronPlayer[]) {}
}

export class FetchGridIronPlayers {
  static readonly type = `[${name}] FetchGridIronPlayers`;
  constructor(public payload: { site: string }) {}
}
