import { EspnClientTeam } from '@app/espn/espn-client.model';

export class SetFantasyFootballTeams {
  public static readonly type = `[fantasyFootballTeams] PatchFantasyFootballTeams`;
  constructor(public payload: EspnClientTeam[]) {}
}
