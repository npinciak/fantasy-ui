// ... Previous test suite and imports ...

import { DfsSlatePlayer } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { MOCK_DFS_SLATE_PLAYER } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { SlatePlayer } from '../models/player.model';
import { SLATE_PLAYER_MOCK } from '../models/slate-player.mock';
import { transformDfsClientPlayerToPlayer } from './dfs-transformers';

describe('Dfs Transformers', () => {
  describe('#transformDfsClientPlayerToPlayer', () => {
    it('should transform a DfsClientPlayer to a SlatePlayer with a complete name', () => {
      const dfsClientPlayer: DfsSlatePlayer = MOCK_DFS_SLATE_PLAYER;

      const expectedSlatePlayer: SlatePlayer = SLATE_PLAYER_MOCK;

      const result = transformDfsClientPlayerToPlayer(dfsClientPlayer);

      expect(result).toEqual(expectedSlatePlayer);
    });

    it('should transform a DfsClientPlayer to a SlatePlayer with a missing first name', () => {
      const dfsClientPlayer: DfsSlatePlayer = { ...MOCK_DFS_SLATE_PLAYER, player: { ...MOCK_DFS_SLATE_PLAYER.player, last_name: '' } };

      const expectedSlatePlayer = { ...SLATE_PLAYER_MOCK, name: MOCK_DFS_SLATE_PLAYER.player.first_name };

      const result = transformDfsClientPlayerToPlayer(dfsClientPlayer);

      expect(result).toEqual(expectedSlatePlayer);
    });
  });
});
