import { BaseballTeamLive } from '../mlb/models/baseball-team.model';

export interface TeamsPayload {
  teams: BaseballTeamLive[];
}

export interface TeamsPayloadActionClass {
  type: string;
  new (payload: TeamsPayload): { payload: TeamsPayload };
}
