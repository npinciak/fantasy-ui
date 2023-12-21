import { ClientSalaryEntity } from './salaries.model';

type ScheduleAttributes = 'id' | 'rg_id' | 'sport_id' | 'date';

export type ClientSchedule = Record<ScheduleAttributes, string> & {
  team_away: ClientScheduleTeamEntity;
  team_home: ClientScheduleTeamEntity;
  salaries: ClientSalaryEntity[] | null;
};

type ScheduleTeamAttributes = 'id' | 'rg_id' | 'hashtag' | 'name';
export type ClientScheduleTeamEntity = Record<ScheduleTeamAttributes, string>;
