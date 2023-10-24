import { Team } from './team.model';

/**
 * Base schedule/game model
 */
export type Schedule = { id: string; rgId: string; date: string; awayTeam: Team; homeTeam: Team };

export type ScheduleMap = Record<string, Schedule>;
