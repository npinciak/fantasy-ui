import { MOCK_CLIENT_SCHEDULE } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { Schedule } from './schedule.model';
import { MOCK_AWAY_TEAM, MOCK_HOME_TEAM } from './team.mock';

export const MOCK_SCHEDULE: Schedule = {
  id: MOCK_CLIENT_SCHEDULE.id,
  rgId: MOCK_CLIENT_SCHEDULE.rg_id,
  date: MOCK_CLIENT_SCHEDULE.date,
  awayTeam: MOCK_AWAY_TEAM,
  homeTeam: MOCK_HOME_TEAM,
};
