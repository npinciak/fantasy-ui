import { FantasyBaseballScoringPeriod } from '../fantasy-baseball-scoring-period';
import { transformToBaseballPlayerBatterStatsRow } from '../transformers/fantasy-baseball.transformers';
import { BaseballPlayer } from './baseball-player.model';

export const MOCK_BASEBALL_PLAYER_B: BaseballPlayer = {
  id: '36185',
  name: 'Ronald Acuna Jr.',
  teamId: '15',
  teamUid: 's:1~l:10~t:15',
  position: 'RF',
  img: 'https://a.espncdn.com/combiner/i?img=/i/headshots/MLB/players/full/36185.png&w=55&h=40&cb=1',
  lastNewsDate: 1679414722000,
  injured: false,
  stats: {
    [FantasyBaseballScoringPeriod.season('2023')]: {
      externalId: '2023',
      id: '102023',
      appliedTotal: 1,
      appliedTotalCeiling: 1,
      scoringPeriodId: 0,
      seasonId: 2023,
      statSplitTypeId: 0,
      appliedAverage: 1,
      stats: {
        '0': 543,
        '1': 149,
        '2': 0.274401473,
        '3': 30,
        '4': 1,
        '5': 29,
        '6': 60,
        '7': 89,
        '8': 268,
        '9': 0.493554328,
        '10': 76,
        '11': 5,
        '12': 12,
        '13': 5,
        '15': 5,
        '16': 636,
        '17': 0.372641509,
        '18': 0.866195837,
        '20': 103,
        '21': 73,
        '23': 33,
        '24': 10,
        '25': 23,
        '26': 12,
        '27': 154,
        '81': 143,
      },
    },
  },
  team: 'Atl',
  injuryStatus: 'ACTIVE',
  defaultPositionId: 9,
  outlookByWeek: [],
  percentOwned: 99.79503618437029,
  percentChange: 0.03790774631831084,
  percentStarted: 99.42396425275632,
  playerRatings: {
    '0': {
      positionalRanking: 5,
      totalRanking: 63,
      totalRating: 8.505085,
    },
  },
  isPitcher: false,
  lineupSlotId: BaseballLineupSlot.LF,
  isStarting: false,
  lineupSlot: 'OF',
  starterStatusByProGame: {},
};

export const MOCK_BASEBALL_PLAYER_B_1: BaseballPlayer = {
  ...MOCK_BASEBALL_PLAYER_B,
  id: '3',
  name: 'Player 3',
  lineupSlotId: BaseballLineupSlot.BE,
};

export const MOCK_BASEBALL_PLAYER_P: BaseballPlayer = {
  ...MOCK_BASEBALL_PLAYER_B,
  id: '2',
  name: 'Justin Verlander',
  position: 'SP',
  isPitcher: true,
  isStarting: true,
  lineupSlotId: BaseballLineupSlot.SP,
};

export const MOCK_BASEBALL_PLAYER_P_1: BaseballPlayer = {
  ...MOCK_BASEBALL_PLAYER_B,
  id: '4',
  name: 'Pedro Martinez',
  position: 'SP',
  isPitcher: true,
  isStarting: false,
  lineupSlotId: BaseballLineupSlot.BE,
};

export const MOCK_BASEBALL_PLAYER_BATTER_LIST = [MOCK_BASEBALL_PLAYER_B, MOCK_BASEBALL_PLAYER_B_1];
export const MOCK_BASEBALL_PLAYER_PITCHER_LIST = [MOCK_BASEBALL_PLAYER_P, MOCK_BASEBALL_PLAYER_P_1];
export const MOCK_BASEBALL_PLAYER_BATTER_STATS_ROW_LIST = MOCK_BASEBALL_PLAYER_BATTER_LIST.map(p =>
  transformToBaseballPlayerBatterStatsRow(p, FantasyBaseballScoringPeriod.season('2023'), '2023')
);
export const MOCK_BASEBALL_PLAYER_PITCHER_STATS_ROW_LIST = MOCK_BASEBALL_PLAYER_PITCHER_LIST.map(p =>
  transformToBaseballPlayerBatterStatsRow(p, FantasyBaseballScoringPeriod.season('2023'), '2023')
);
