import { MOCK_TEAM_1 } from '@app/espn/models/team.model.mock';
import { MOCK_BASEBALL_PLAYER_1, MOCK_BASEBALL_PLAYER_2 } from './baseball-player.model.mock';
import { BaseballTeam } from './baseball-team.model';

export const MOCK_BASEBALL_TEAM_1: BaseballTeam = {
  ...MOCK_TEAM_1,
  abbrev: 'TEAM1',
  roster: [MOCK_BASEBALL_PLAYER_1, MOCK_BASEBALL_PLAYER_2],
  totalPoints: 58,
  currentRank: 5,
  rotoStats: {
    0: 7849,
    1: 2088,
    2: 0.26602115,
    5: 291,
    20: 1210,
    21: 1043,
    23: 133,
    33: 186,
    34: 3559,
    37: 1130,
    39: 333,
    41: 1.23321158,
    45: 525,
    47: 3.98286035,
    48: 1172,
    53: 80,
    57: 46,
  },
};
