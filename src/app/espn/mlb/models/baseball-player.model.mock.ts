import { InjuryStatusType } from '@app/espn/models/injury.model';
import { MOCK_PLAYER_2 } from '@app/espn/models/player.model.mock';
import { MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_POSITION_MAP } from '../consts/position.const';
import { MLB_TEAM_MAP } from '../consts/team.const';
import { PlayingStatus } from '../mlb.enums';
import { ESPN_BASEBALL_FREEAGENT_1 } from '../services/free-agent.mock';
import { ESPN_BASEBALL_PLAYER_MOCK_1 } from '../services/roster.mock';
import { BaseballPlayer } from './baseball-player.model';

export const MOCK_BASEBALL_PLAYER_1: BaseballPlayer = {
  id: ESPN_BASEBALL_PLAYER_MOCK_1.playerId.toString(),
  name: ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.fullName,
  img: `https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${ESPN_BASEBALL_PLAYER_MOCK_1.playerId}.png&w=96&h=70&cb=1`,
  team: MLB_TEAM_MAP[ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.proTeamId],
  position: MLB_POSITION_MAP[ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.defaultPositionId].abbrev,
  isInjured: ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.injured,
  injuryStatus: ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.injuryStatus,
  playerOwnershipChange: ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.ownership.percentChange,
  playerOwnershipPercentOwned: ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.ownership.percentOwned,
  isPitcher: false,
  lineupSlot: MLB_LINEUP_MAP[ESPN_BASEBALL_PLAYER_MOCK_1.lineupSlotId].abbrev,
  lineupSlotId: ESPN_BASEBALL_PLAYER_MOCK_1.lineupSlotId,
  isStarting: false,
  startingStatus: null,
  playerRatings: ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.ratings,
  stats: { '022021': ESPN_BASEBALL_PLAYER_MOCK_1.playerPoolEntry.player.stats[0].stats },
  starterStatusByProGame: {
    401227055: 'STARTING',
  },
};

export const MOCK_BASEBALL_FREEAGENT_1: BaseballPlayer = {
  id: ESPN_BASEBALL_FREEAGENT_1.id.toString(),
  name: ESPN_BASEBALL_FREEAGENT_1.player.fullName,
  img: `https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${ESPN_BASEBALL_FREEAGENT_1.id}.png&w=96&h=70&cb=1`,
  team: MLB_TEAM_MAP[ESPN_BASEBALL_FREEAGENT_1.player.proTeamId],
  position: MLB_POSITION_MAP[ESPN_BASEBALL_FREEAGENT_1.player.defaultPositionId].abbrev,
  isInjured: ESPN_BASEBALL_FREEAGENT_1.player.injured,
  injuryStatus: ESPN_BASEBALL_FREEAGENT_1.player.injuryStatus,
  playerOwnershipChange: ESPN_BASEBALL_FREEAGENT_1.player.ownership.percentChange,
  playerOwnershipPercentOwned: ESPN_BASEBALL_FREEAGENT_1.player.ownership.percentOwned,
  isPitcher: false,
  lineupSlotId: null,
  isStarting: false,
  startingStatus: null,
  lineupSlot: null,
  playerRatings: ESPN_BASEBALL_FREEAGENT_1.ratings,
  stats: { '05401229476': ESPN_BASEBALL_FREEAGENT_1.player.stats[0].stats },
  starterStatusByProGame: { 401227055: 'NOTSTARTING' },
};

export const MOCK_BASEBALL_PLAYER_2: BaseballPlayer = {
  ...MOCK_PLAYER_2,
  team: MLB_TEAM_MAP[2],
  position: 'P',
  isInjured: true,
  injuryStatus: InjuryStatusType.O,
  playerOwnershipChange: -0.107,
  playerOwnershipPercentOwned: 78.70117,
  isPitcher: true,
  lineupSlotId: 1,
  lineupSlot: MLB_LINEUP_MAP[1].abbrev,
  isStarting: true,
  startingStatus: PlayingStatus.Probable,
  starterStatusByProGame: { 401227055: 'NOTSTARTING' },
  playerRatings: { 0: { positionalRanking: 12, totalRanking: 56, totalRating: 44.809 } },
  stats: {
    2: {
      32: 26,
      33: 26,
      34: 438,
      35: 587,
      37: 147,
      38: 0.267759563,
      39: 33,
      40: 1,
      41: 1.23,
      42: 2,
      43: 0.310051107,
      44: 74,
      45: 68,
      46: 22,
      47: 4.19,
      48: 112,
      50: 3,
      53: 9,
      54: 7,
      55: 0.5625,
      63: 14,
      82: 3.39,
    },
  },
};
