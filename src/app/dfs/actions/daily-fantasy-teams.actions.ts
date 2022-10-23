import { Team } from '../models/team.model';

export class SetTeams {
  static readonly type = `[dailyFantasyTeams] SetTeams`;
  constructor(public payload: Team[]) {}
}

export class ClearAndAddTeams {
  static readonly type = `[dailyFantasyTeams] ClearAndAddTeams`;
  constructor(public payload: Team[]) {}
}
