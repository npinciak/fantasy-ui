import { ClientSchedule } from '../schedule.model';
import { MOCK_SCHEDULE_AWAY_TEAM, MOCK_SCHEDULE_HOME_TEAM } from './schedule-team.mock';

export const MOCK_CLIENT_SCHEDULE: ClientSchedule = {
  id: '1',
  rg_id: '2',
  sport_id: '1',
  date: '2023-10-29 17:00:00',
  team_away: MOCK_SCHEDULE_AWAY_TEAM,
  team_home: MOCK_SCHEDULE_HOME_TEAM,
  salaries: [
    {
      position: 'QB',
      salary: 10000,
      player_id: '123',
    },
  ],
};
