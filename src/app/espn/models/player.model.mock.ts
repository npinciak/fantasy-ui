import { Player } from './player.model';
import { MOCK_TEAM_1, MOCK_TEAM_2 } from './team.model.mock';

export const MOCK_PLAYER_1: Player = {
  id: '1',
  name: 'Player 1',
  img: 'https://example.com/',
  team: MOCK_TEAM_1.name,
  position: 'C',
};

export const MOCK_PLAYER_2: Player = {
  id: '2',
  name: 'Player 2',
  img: 'https://example.com/',
  team: MOCK_TEAM_2.name,
  position: 'P',
};
