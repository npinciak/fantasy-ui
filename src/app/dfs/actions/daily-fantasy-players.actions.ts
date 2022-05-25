import { SlatePlayer } from '../models/player.model';

export class FetchPlayers {
  static readonly type = `[dailyFantasyPlayers] FetchPlayers`;
  constructor(public payload: { slatePath: string }) {}
}

export class PatchPlayers {
  static readonly type = `[dailyFantasyPlayers] PatchPlayers`;
  constructor(public payload: SlatePlayer[]) {}
}
