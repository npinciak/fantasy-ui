import { SlateTeam, SlateTeamMap } from '../service/slate.service';
import { Team } from './team.model';

export const MOCK_DFS_TEAM_1: Team = {
  id: '1',
  rgId: '100',
  name: 'Patriots',
  shortName: 'NEP',
};

export const MOCK_DFS_TEAM_2: Team = {
  id: '2',
  rgId: '101',
  name: 'Falcons',
  shortName: 'ATL',
};

export const MOCK_DFS_TEAM_LIST = [MOCK_DFS_TEAM_1, MOCK_DFS_TEAM_2];
export const MOCK_DFS_TEAM_MAP = { [MOCK_DFS_TEAM_1.rgId]: MOCK_DFS_TEAM_1, [MOCK_DFS_TEAM_2.rgId]: MOCK_DFS_TEAM_2 };

export const MOCK_DFS_TEAM_1_VEGAS = {
  vegas: {
    'o/u': 48.5,
    opp_total: 26.25,
    total: 22.25,
    line: 167,
    movement: 0.5,
  },
};

export const MOCK_DFS_TEAM_2_VEGAS = {
  vegas: {
    'o/u': 48.5,
    opp_total: 22.25,
    total: 26.25,
    line: -199,
    movement: 0.5,
  },
};

export const MOCK_DFS_TEAM_VEGAS_LIST = [MOCK_DFS_TEAM_1_VEGAS, MOCK_DFS_TEAM_2_VEGAS];

export const MOCK_SLATE_TEAM_1: SlateTeam = {
  ...MOCK_DFS_TEAM_1,
  ...MOCK_DFS_TEAM_1_VEGAS,
};

export const MOCK_SLATE_TEAM_2: SlateTeam = {
  ...MOCK_DFS_TEAM_2,
  ...MOCK_DFS_TEAM_2_VEGAS,
};

export const MOCK_SLATE_TEAM_LIST: SlateTeam[] = [MOCK_SLATE_TEAM_1, MOCK_SLATE_TEAM_2];
export const MOCK_SLATE_TEAM_MAP: SlateTeamMap = { [MOCK_SLATE_TEAM_1.id]: MOCK_SLATE_TEAM_1, [MOCK_SLATE_TEAM_2.id]: MOCK_SLATE_TEAM_2 };
