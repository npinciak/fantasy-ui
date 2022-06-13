import { FastcastEventTeam } from '../models/fastcast-team.model';

export class SetFastcastTeams {
  static readonly type = `[espnFastcastTeam] SetFastcastTeams`;
  constructor(public payload: FastcastEventTeam[]) {}
}
