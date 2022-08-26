import { FootballTeam } from '../models/football-team.model';

export class SetFantasyFootballTeams {
  public static readonly type = `[fantasyFootballTeams] PatchFantasyFootballTeams`;
  constructor(public payload: FootballTeam[]) {}
}
