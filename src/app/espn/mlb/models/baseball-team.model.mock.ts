import { MOCK_BASEBALL_PLAYER_BATTER_LIST, MOCK_BASEBALL_PLAYER_PITCHER_LIST } from './baseball-player.model.mock';
import { BaseballTeam, BaseballTeamLive } from './baseball-team.model';

export const MOCK_BASEBALL_TEAM_1: BaseballTeam = {
  id: '1',
  name: 'Team',
  abbrev: 'TEAM',
  logo: 'https://g.espncdn.com/lm-static/flb/images/default_logos/8.svg',
  roster: [...MOCK_BASEBALL_PLAYER_BATTER_LIST, ...MOCK_BASEBALL_PLAYER_PITCHER_LIST],
  totalPoints: 60.5,
  liveScore: 0,
  currentRank: 1,
  rotoStats: {
    '0': 0,
    '1': 0,
    '2': 0,
    '5': 0,
    '20': 0,
    '21': 0,
    '23': 0,
    '33': 0,
    '34': 0,
    '37': 0,
    '39': 0,
    '41': 'Infinity',
    '45': 0,
    '47': 'Infinity',
    '48': 0,
    '53': 0,
    '57': 0,
    '60': 0,
  },
};

export const MOCK_BASEBALL_TEAM_2: BaseballTeam = {
  id: '2',
  name: 'Team 2',
  abbrev: 'TEAM 2',
  logo: 'https://g.espncdn.com/lm-static/flb/images/default_logos/8.svg',
  roster: [...MOCK_BASEBALL_PLAYER_BATTER_LIST, ...MOCK_BASEBALL_PLAYER_PITCHER_LIST],
  totalPoints: 61.5,
  liveScore: 10,
  currentRank: 2,
  rotoStats: {
    '0': 0,
    '1': 0,
    '2': 0,
    '5': 0,
    '20': 0,
    '21': 0,
    '23': 0,
    '33': 0,
    '34': 0,
    '37': 0,
    '39': 0,
    '41': 'Infinity',
    '45': 0,
    '47': 'Infinity',
    '48': 0,
    '53': 0,
    '57': 0,
    '60': 0,
  },
};

export const MOCK_BASEBALL_TEAM_LIVE_1: BaseballTeamLive = {
  id: MOCK_BASEBALL_TEAM_1.id,
  totalPoints: MOCK_BASEBALL_TEAM_1.totalPoints,
  liveScore: MOCK_BASEBALL_TEAM_1.liveScore,
  roster: MOCK_BASEBALL_TEAM_1.roster,
};

export const MOCK_BASEBALL_TEAM_LIVE_2: BaseballTeamLive = {
  id: MOCK_BASEBALL_TEAM_2.id,
  totalPoints: MOCK_BASEBALL_TEAM_2.totalPoints,
  liveScore: MOCK_BASEBALL_TEAM_2.liveScore,
  roster: MOCK_BASEBALL_TEAM_2.roster,
};

export const MOCK_BASEBALL_TEAM_LIST = [MOCK_BASEBALL_TEAM_1, MOCK_BASEBALL_TEAM_2];
export const MOCK_BASEBALL_TEAM_LIVE_LIST = [MOCK_BASEBALL_TEAM_LIVE_1, MOCK_BASEBALL_TEAM_LIVE_2];
