import { FootballTeam } from '../models/football-team.model';

export class SetFantasyFootballTeams {
  public static readonly type = `[fantasyFootballTeams] PatchFantasyFootballTeams`;
  constructor(public payload: FootballTeam[]) {}
}

export class ClearAndAddFantasyFootballTeams {
  public static readonly type = `[fantasyFootballTeams] ClearAndAddFantasyFootballTeams`;
  constructor(public payload: FootballTeam[]) {}
}
