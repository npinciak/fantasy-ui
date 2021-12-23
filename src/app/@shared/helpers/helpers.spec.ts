import { stadiumConditionsMap } from './mapping';
import { MOCK_DATA_CLIMA } from './testConfigs';

describe('[Helpers]', () => {
  describe('stadiumConditionsMap', () => {
    it('should return empty map if conditions size is 0', () => {
      const actual = stadiumConditionsMap({});
      const expected = 0;
      expect(Object.values(actual).length).toEqual(expected);
    });

    it('should return map of conditions', () => {
      const intervalValue = MOCK_DATA_CLIMA.WEATHER_CURRENT_CONDITIONS.data.timelines[0].intervals[0].values;
      const actual = stadiumConditionsMap({ 1: intervalValue });
      const expected = 1;

      expect(Object.values(actual).length).toEqual(expected);
    });
  });
});
