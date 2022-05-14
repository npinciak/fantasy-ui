import { FastcastEventTeam } from '../models/fastcast-team.model';

export class PatchFastcastTeams {
  static readonly type = `[espnFastcastTeam] PatchFastcastTeams`;
  constructor(public payload: FastcastEventTeam[]) {}
}
