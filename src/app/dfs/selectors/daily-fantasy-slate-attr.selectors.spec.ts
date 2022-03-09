import { MOCK_PLAYER_1_SLATE_ATTR, MOCK_PLAYER_SLATE_ATTR_MAP } from '../models/player-slate-attr.model.mock';
import { MOCK_DFS_TEAM_1, MOCK_DFS_TEAM_2, MOCK_SLATE_TEAM_1, MOCK_SLATE_TEAM_2, MOCK_SLATE_TEAM_MAP } from '../models/team.model.mock';
import { DailyFantasySlateAttrSelectors } from './daily-fantasy-slate-attr.selectors';
import { DailyFantasyTeamsSelectors } from './daily-fantasy-team.selectors';

describe('[DailyFantasySlateAttrSelectors]', () => {
  const dailyFantasyTeamState = {
    map: {
      [MOCK_DFS_TEAM_1.id]: MOCK_DFS_TEAM_1,
      [MOCK_DFS_TEAM_2.id]: MOCK_DFS_TEAM_2,
    },
  };

  const state = {
    teams: MOCK_SLATE_TEAM_MAP,
    players: MOCK_PLAYER_SLATE_ATTR_MAP,
    slate: '123456',
    site: null,
  };

  const teamMap = {
    [MOCK_SLATE_TEAM_1.id]: { ...MOCK_SLATE_TEAM_1, team: MOCK_DFS_TEAM_1 },
    [MOCK_SLATE_TEAM_2.id]: { ...MOCK_SLATE_TEAM_2, team: MOCK_DFS_TEAM_2 },
  };

  const selectPlayerById = DailyFantasySlateAttrSelectors.selectPlayerById(state.players);
  const selectTeamById = DailyFantasySlateAttrSelectors.selectTeamById(state.teams);
  const selectDailyFantasyTeamsTeamById = DailyFantasyTeamsSelectors.selectTeamById(dailyFantasyTeamState.map);
  const selectTeamList = DailyFantasySlateAttrSelectors.selectTeamList(state.teams, selectDailyFantasyTeamsTeamById);

  it('should selectPlayerById', () => {
    const selector = selectPlayerById(MOCK_PLAYER_1_SLATE_ATTR.id);
    expect(selector).toBe(MOCK_PLAYER_1_SLATE_ATTR);
  });

  it('should selectTeamById', () => {
    const selector = selectTeamById(MOCK_SLATE_TEAM_1.id);
    expect(selector).toBe(MOCK_SLATE_TEAM_1);
  });

  it('should selectTeamList', () => {
    const expected = Object.values(teamMap);
    expect(selectTeamList).toEqual(expected);
  });
});
