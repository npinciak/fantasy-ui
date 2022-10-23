import { FootballPlayerFreeAgent } from '../models/football-player.model';

export class SetFantasyFootballFreeAgents {
  public static readonly type = `[fantasyFootballFreeAgents] PatchFantasyFootballFreeAgents`;
  constructor(public payload: FootballPlayerFreeAgent[]) {}
}

export class ClearAndAddFantasyFootballFreeAgents {
  static readonly type = `[fantasyFootballFreeAgents] ClearAndAddFantasyFootballFreeAgents`;
  constructor(public payload: FootballPlayerFreeAgent[]) {}
}

export class FetchFantasyFootballFreeAgents {
  static readonly type = `[fantasyFootballFreeAgents] FetchFantasyFootballFreeAgents`;
  constructor(public payload: { leagueId: string }) {}
}
