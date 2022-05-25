import { BaseballTeam } from '../models/baseball-team.model';

export class PatchFantasyBaseballTeams {
  static readonly type = `[fantasyBaseballTeams] PatchFantasyBaseballTeams`;
  constructor(public payload: BaseballTeam[]) {}
}
