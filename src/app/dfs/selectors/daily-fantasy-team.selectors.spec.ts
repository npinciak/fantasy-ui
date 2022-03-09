import { MOCK_DFS_TEAM_1, MOCK_DFS_TEAM_2, MOCK_DFS_TEAM_LIST } from '../models/team.model.mock';
import { DailyFantasyTeamsSelectors } from './daily-fantasy-team.selectors';

describe('[DailyFantasyTeamsSelectors]', () => {
  const state = {
    map: {
      [MOCK_DFS_TEAM_1.rgId]: MOCK_DFS_TEAM_1,
      [MOCK_DFS_TEAM_2.rgId]: MOCK_DFS_TEAM_2,
    },
  };

  it('should select team by Id', () => {
    const selector = DailyFantasyTeamsSelectors.selectTeamById(state.map)(MOCK_DFS_TEAM_1.rgId);
    expect(selector).toEqual(MOCK_DFS_TEAM_1);
  });

  it('should return list of teams', () => {
    const selector = DailyFantasyTeamsSelectors.selectTeamList(state.map)
    expect(selector).toEqual(MOCK_DFS_TEAM_LIST);
  });
});
