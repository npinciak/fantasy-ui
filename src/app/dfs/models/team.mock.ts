import { MOCK_SCHEDULE_AWAY_TEAM, MOCK_SCHEDULE_HOME_TEAM } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { Team } from './team.model';

export const MOCK_HOME_TEAM: Team = {
  id: MOCK_SCHEDULE_HOME_TEAM.id,
  name: MOCK_SCHEDULE_HOME_TEAM.name,
  rgId: MOCK_SCHEDULE_HOME_TEAM.rg_id,
  shortName: MOCK_SCHEDULE_HOME_TEAM.hashtag,
};

export const MOCK_AWAY_TEAM: Team = {
  id: MOCK_SCHEDULE_AWAY_TEAM.id,
  name: MOCK_SCHEDULE_AWAY_TEAM.name,
  rgId: MOCK_SCHEDULE_AWAY_TEAM.rg_id,
  shortName: MOCK_SCHEDULE_AWAY_TEAM.hashtag,
};

export const MOCK_TEAM_LIST: Team[] = [MOCK_HOME_TEAM, MOCK_AWAY_TEAM];
