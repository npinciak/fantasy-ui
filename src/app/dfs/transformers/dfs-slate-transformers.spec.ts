import { ClientVegas } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { MOCK_CLIENT_VEGAS } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { MOCK_VEGAS } from '../models/vegas.mock';
import { Vegas } from '../models/vegas.model';
import { transformClientVegasToVegas } from './dfs-slate-transformers';

describe('Dfs Slate Transformers', () => {
  describe('#transformClientVegasToVegas', () => {
    it('should transform a ClientVegas model to a Vegas model', () => {
      const clientVegas: ClientVegas = MOCK_CLIENT_VEGAS;

      const expected: Vegas = MOCK_VEGAS;

      const actual = transformClientVegasToVegas(clientVegas);

      expect(actual).toEqual(expected);
    });

    it('should return null if no ClientVegas model', () => {
      const clientVegas: ClientVegas | null = null;

      const actual = transformClientVegasToVegas(clientVegas);

      expect(actual).toBeNull();
    });
  });
});
