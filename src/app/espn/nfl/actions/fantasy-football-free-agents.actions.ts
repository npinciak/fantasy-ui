import { FootballPlayerFreeAgent } from '../models/football-player.model';

export namespace FantasyFootballFreeAgents {
  export const name = 'fantasyFootballFreeAgents';
  type Entity = FootballPlayerFreeAgent;

  export class AddOrUpdate {
    public static readonly type = `[${name}] AddOrUpdate`;
    constructor(public payload: Entity[]) {}
  }

  export class ClearAndAdd {
    public static readonly type = `[${name}] ClearAndAdd`;
    constructor(public payload: Entity[]) {}
  }

  export class Fetch {
    static readonly type = `[${name}] Fetch`;
    constructor(public payload: { leagueId: string }) {}
  }
}
