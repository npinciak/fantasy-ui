import { Team } from '../models/team.model';

export class PatchTeams {
  static readonly type = `[dailyFantasyTeams] PatchTeams`;
  constructor(public payload: Team[]) {}
}
