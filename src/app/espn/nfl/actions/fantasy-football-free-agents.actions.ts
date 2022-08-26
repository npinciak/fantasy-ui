import { FootballPlayerFreeAgent } from '../models/football-player.model';

export class SetFantasyFootballFreeAgents {
  public static readonly type = `[fantasyFootballFreeAgents] PatchFantasyFootballFreeAgents`;
  constructor(public payload: FootballPlayerFreeAgent[]) {}
}

export class FetchFantasyFootballFreeAgents {
  static readonly type = `[fantasyFootballFreeAgents] FetchFantasyFootballFreeAgents`;
}
