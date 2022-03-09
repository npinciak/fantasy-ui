import { PlayerSlateAttr } from './player-slate-attr.model';
import { MOCK_DFS_PLAYER_1 } from './player.model.mock';

export const MOCK_PLAYER_1_SLATE_ATTR: PlayerSlateAttr = {
  id: MOCK_DFS_PLAYER_1.id,
  statGroup: 'player-stat-group',
  salaryDiff: null,
  slateOwn: { [2]: '10%' },
  ownership: 19,
  value: 2,
  smash: 56,
};

export const MOCK_PLAYER_SLATE_ATTR_LIST = [MOCK_PLAYER_1_SLATE_ATTR];
export const MOCK_PLAYER_SLATE_ATTR_MAP = { [MOCK_PLAYER_1_SLATE_ATTR.id]: MOCK_PLAYER_1_SLATE_ATTR };
