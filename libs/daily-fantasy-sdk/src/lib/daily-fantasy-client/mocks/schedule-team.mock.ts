import { ScheduleTeamEntity } from '../schedule.model';

export const MOCK_SCHEDULE_HOME_TEAM: ScheduleTeamEntity = {
  hashtag: 'NE',
  id: '348',
  rg_id: '11',
  name: 'Patriots',
};

export const MOCK_SCHEDULE_AWAY_TEAM: ScheduleTeamEntity = {
  hashtag: 'MIA',
  id: '345',
  rg_id: '10',
  name: 'Dolphins',
};

export const MOCK_SCHEDULE_TEAM_LIST: ScheduleTeamEntity[] = [MOCK_SCHEDULE_HOME_TEAM, MOCK_SCHEDULE_AWAY_TEAM];
