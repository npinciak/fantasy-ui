import { BaseballTeam } from '../models/baseball-team.model';

export namespace FantasyBaseballTeams {
  export const name = 'fantasyBaseballTeams';
  type Entity = BaseballTeam;

  export class AddOrUpdate {
    public static readonly type = `[${name}}] AddOrUpdate`;
    constructor(public payload: Entity[]) {}
  }

  export class ClearAndAdd {
    public static readonly type = `[${name}}] ClearAndAdd`;
    constructor(public payload: Entity[]) {}
  }
}
