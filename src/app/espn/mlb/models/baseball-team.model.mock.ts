import { ESPN_BASEBALL_TEAM_LIVE_MOCK, ESPN_BASEBALL_TEAM_MOCK } from '../services/team.mock';
import { MOCK_BASEBALL_PLAYER_1 } from './baseball-player.model.mock';

export const MOCK_BASEBALL_TEAM_1 = {
  id: ESPN_BASEBALL_TEAM_MOCK.id.toString(),
  name: `${ESPN_BASEBALL_TEAM_MOCK.location} ${ESPN_BASEBALL_TEAM_MOCK.nickname}`,
  logo: ESPN_BASEBALL_TEAM_MOCK.logo,
  abbrev: ESPN_BASEBALL_TEAM_MOCK.abbrev,
  roster: [MOCK_BASEBALL_PLAYER_1],
  totalPoints: ESPN_BASEBALL_TEAM_MOCK.points,
  currentRank: ESPN_BASEBALL_TEAM_MOCK.rankCalculatedFinal,
  rotoStats: ESPN_BASEBALL_TEAM_MOCK.valuesByStat,
  liveScore: 0,
};

export const MOCK_BASEBALL_TEAM_LIVE = {
  id: ESPN_BASEBALL_TEAM_MOCK.id.toString(),
  roster: [MOCK_BASEBALL_PLAYER_1],
  totalPoints: ESPN_BASEBALL_TEAM_MOCK.points,
  liveScore: ESPN_BASEBALL_TEAM_LIVE_MOCK.totalPointsLive,
};
