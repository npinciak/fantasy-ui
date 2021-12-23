import { Player } from './player.model';

export const MOCK_PLAYER_1: Player = {
  id: '1',
  name: 'Name',
  isInjured: false,
  injuryStatus: '',
  playerRatings: {},
  playerOwnership: {
    change: 10,
    percentOwned: 10,
  },
};

export const MOCK_PLAYER_2: Player = {
  id: '2',
  name: 'Name 2',
  isInjured: true,
  injuryStatus: '',
  playerRatings: {},
  playerOwnership: {
    change: 10,
    percentOwned: 10,
  },
};
