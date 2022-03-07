import { Player, SlatePlayer } from './player.model';

export const MOCK_DFS_PLAYER_1: Player = {
  id: '1',
  name: '',
  team: '',
  position: '',
  img: '',
  rgId: '',
  teamId: '',
  rgTeamId: '',
  gameId: '',
};

export const MOCK_DFS_SLATE_PLAYER_1: SlatePlayer = {
  id: MOCK_DFS_PLAYER_1.id,
  name: '',
  position: '',
  rgId: '',
  teamId: '',
  rgTeamId: '',
  gameId: '',
};

export const MOCK_DFS_SLATE_PLAYER_LIST = [MOCK_DFS_SLATE_PLAYER_1];
export const MOCK_DFS_SLATE_PLAYER_MAP = { [MOCK_DFS_SLATE_PLAYER_1.id]: MOCK_DFS_SLATE_PLAYER_1 };
