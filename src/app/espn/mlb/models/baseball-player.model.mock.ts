import { BaseballPlayer } from './baseball-player.model';
import { MOCK_PLAYER_1, MOCK_PLAYER_2 } from './player.model.mock';

export const MOCK_BASEBALL_PLAYER_1: BaseballPlayer = {
  ...MOCK_PLAYER_1,
  playerImg: '',
  lineupSlot: 1,
  defaultPosition: '',
  proTeam: '',
  isStarting: true,
  startingStatus: {},
  isPitcher: false,
};

export const MOCK_BASEBALL_PLAYER_2: BaseballPlayer = {
  ...MOCK_PLAYER_2,
  playerImg: '',
  lineupSlot: 2,
  defaultPosition: '',
  proTeam: '',
  isStarting: true,
  startingStatus: {},
  isPitcher: true,
};
