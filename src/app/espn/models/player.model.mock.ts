import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { MOCK_TEAM_1, MOCK_TEAM_2 } from './team.model.mock';

export const MOCK_PLAYER_1: PlayerEntity = {
  id: '1',
  name: 'Player 1',
  img: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/1.png&w=96&h=70&cb=1',
  team: MOCK_TEAM_1.name,
  position: 'C',
  teamUid: '',
  teamId: '',
};

export const MOCK_PLAYER_2: PlayerEntity = {
  id: '2',
  name: 'Player 2',
  img: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/2.png&w=96&h=70&cb=1',
  team: MOCK_TEAM_2.name,
  position: 'P',
  teamUid: '',
  teamId: '',
};
