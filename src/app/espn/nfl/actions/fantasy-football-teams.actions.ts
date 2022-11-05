import { FootballTeam } from '../models/football-team.model';

export namespace FantasyFootballTeams {
  export const name = 'fantasyFootballTeams';
  type Entity = FootballTeam;

  export class AddOrUpdate {
    public static readonly type = `[${name}] AddOrUpdate`;
    constructor(public payload: Entity[]) {}
  }

  export class ClearAndAdd {
    public static readonly type = `[${name}] ClearAndAdd`;
    constructor(public payload: Entity[]) {}
  }
}
