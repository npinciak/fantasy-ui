import { Team } from './team.model';

/**
 * Base schedule/game model
 */
interface ScheduleProperties {
  id: string;
  rgId: string;
  date: string;
  awayTeam: Team;
  homeTeam: Team;
}

export type Schedule = ScheduleProperties;
