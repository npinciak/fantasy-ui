import { Team } from '../models/team.model';

export class SetTeams {
  static readonly type = `[dailyFantasyTeams] SetTeams`;
  constructor(public payload: Team[]) {}
}
