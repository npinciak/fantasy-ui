import { SlatePlayer } from '../models/player.model';

export class FetchPlayers {
  static readonly type = `[dailyFantasyPlayers] FetchPlayers`;
  constructor(public payload: { slatePath: string }) {}
}

export class SetPlayers {
  static readonly type = `[dailyFantasyPlayers] SetPlayers`;
  constructor(public payload: SlatePlayer[]) {}
}

export class ClearAndAddPlayers {
  static readonly type = `[dailyFantasyPlayers] ClearAndAddPlayers`;
  constructor(public payload: SlatePlayer[]) {}
}
