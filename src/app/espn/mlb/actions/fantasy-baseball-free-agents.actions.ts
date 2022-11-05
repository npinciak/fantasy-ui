import { BaseballPlayer } from '../models/baseball-player.model';

export namespace FantasyBaseballFreeAgents {
  export const name = 'fantasyBaseballFreeAgents';
  type Entity = BaseballPlayer;

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
