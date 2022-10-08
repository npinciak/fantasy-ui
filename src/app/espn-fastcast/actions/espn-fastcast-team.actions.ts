import { FastcastEventTeam } from '../models/fastcast-team.model';

export class SetFastcastTeams {
  static readonly type = `[espnFastcastTeam] SetFastcastTeams`;
  constructor(public payload: FastcastEventTeam[]) {}
}

export class ClearAndaddFastcastTeams {
  static readonly type = `[espnFastcastTeam] ClearAndaddFastcastTeams`;
  constructor(public payload: FastcastEventTeam[]) {}
}
