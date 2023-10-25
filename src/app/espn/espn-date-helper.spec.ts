import { EspnDateHelper } from './espn-date-helper';

describe('EspnDateHelper', () => {
  const dateHelper = new EspnDateHelper();

  describe('#tickerDate', () => {
    it('should convert to ticker date', () => {
      const date = 1675452811335;
      const actual = dateHelper.tickerDate(date);
      const expected = 'Fri 2:33 PM';
      expect(actual).toEqual(expected);
    });
  });
});
