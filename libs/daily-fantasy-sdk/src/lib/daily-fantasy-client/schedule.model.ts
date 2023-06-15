import { SalariesEntity } from './salaries.model';

type ScheduleAttributes = 'id' | 'rg_id' | 'sport_id' | 'date';
export type Schedule = { [attr in ScheduleAttributes]: string } & {
  team_away: ScheduleTeamEntity;
  team_home: ScheduleTeamEntity;
  salaries: SalariesEntity[] | null;
};

type ScheduleTeamAttributes = 'id' | 'rg_id' | 'hashtag' | 'name';
export type ScheduleTeamEntity = { [attr in ScheduleTeamAttributes]: string };
