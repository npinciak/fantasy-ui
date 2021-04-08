import { Team } from './team';

export interface League {
    id: number;
    schedule: ScheduleEntry[];
    settings: { name: string };
    teams: Team[];
}

export interface ScheduleEntry {
    teams: ScheduleTeams[];
}

export interface ScheduleTeams {
    teamId: number;
    totalPoints: number;
    totalPointsLive: number;
}
