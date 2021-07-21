import { EspnClientTeam } from './team';

export interface EspnClientLeague {
  id: number;
  schedule: EspnClientScheduleEntry[];
  scoringPeriodId: number;
  settings: { name: string };
  teams: EspnClientTeam[];
}

export interface EspnClientScheduleEntry {
  teams: EspnClientScheduleTeams[];
}

export interface EspnClientScheduleTeams {
  teamId: number;
  totalPoints: number;
  totalPointsLive: number;
}
