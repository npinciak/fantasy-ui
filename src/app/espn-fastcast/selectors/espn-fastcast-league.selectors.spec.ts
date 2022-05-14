import { MOCK_FASTCAST_LEAGUE_1 } from '../models/fastcast-league.model.mock';
import { EspnFastcastLeagueSelectors } from './espn-fastcast-league.selectors';

describe('EspnFastcastLeagueSelectors', () => {
  const state = {
    map: { [MOCK_FASTCAST_LEAGUE_1.id]: MOCK_FASTCAST_LEAGUE_1 },
  };

  describe('selectLeagueById', () => {
    it('should return league by id', () => {
      const expected = MOCK_FASTCAST_LEAGUE_1;
      const actual = EspnFastcastLeagueSelectors.getById(state.map)(MOCK_FASTCAST_LEAGUE_1.id);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectPrettyLeagueList', () => {
    it('should return list of leauges', () => {
      const expected = [MOCK_FASTCAST_LEAGUE_1];
      const actual = EspnFastcastLeagueSelectors.getList(state.map);

      expect(actual).toEqual(expected);
    });
  });
});
