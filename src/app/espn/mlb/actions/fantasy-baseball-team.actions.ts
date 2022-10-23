import { BaseballTeam } from '../models/baseball-team.model';

export class SetFantasyBaseballTeams {
  static readonly type = `[fantasyBaseballTeams] SetFantasyBaseballTeams`;
  constructor(public payload: BaseballTeam[]) {}
}

export class ClearAndAddFantasyBaseballTeams {
  static readonly type = `[fantasyBaseballTeams] ClearAndAddFantasyBaseballTeams`;
  constructor(public payload: BaseballTeam[]) {}
}
