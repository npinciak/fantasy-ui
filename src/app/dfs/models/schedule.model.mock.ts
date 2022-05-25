import { MOCK_TEAM_1, MOCK_TEAM_2 } from '@app/espn/models/team.model.mock';
import { Schedule } from './schedule.model';

export const MOCK_SCHEDULE_1: Schedule = {
  id: '1',
  rgId: '1',
  date: '',
  awayTeam: { ...MOCK_TEAM_1, rgId: '1', shortName: 'T1' },
  homeTeam: { ...MOCK_TEAM_2, rgId: '2', shortName: 'T2' },
};

export const MOCK_SCHEDULE_2: Schedule = {
  ...MOCK_SCHEDULE_1,
  id: '2',
  rgId: '2',
};

export const MOCK_SCHEDULE_LIST = [MOCK_SCHEDULE_1, MOCK_SCHEDULE_2];
