import { addHoursToDate, espnDateFormatter, subtractYears, tickerDate } from './date';

describe('espnDateFormatter', () => {
  it('should set date w/o delim', () => {
    const delim = '';
    const date = 1675452811335;
    const actual = espnDateFormatter({ delim, date });
    const expected = '20230203';
    expect(actual).toEqual(expected);
  });

  it('should set date w delim', () => {
    const delim = '-';
    const date = 1675452811335;
    const actual = espnDateFormatter({ delim, date });
    const expected = '2023-02-03';
    expect(actual).toEqual(expected);
  });
});

describe('addHoursToDate', () => {
  it('should subtract 1 hour', () => {
    const date = 1675452811335;
    const actual = addHoursToDate(date, 1).getTime();
    const expected = 1675456411335;
    expect(actual).toEqual(expected);
  });
});

describe('subtractYears', () => {
  it('should subtract 1 year', () => {
    const date = 1675452811335;
    const actual = subtractYears(date, 1).getTime();
    const expected = 1643916811335;
    expect(actual).toEqual(expected);
  });
});

describe('tickerDate', () => {
  it('should convert to ticker date', () => {
    const date = 1675452811335;
    const actual = tickerDate(date);
    const expected = 'Fri 2:33 PM';
    expect(actual).toEqual(expected);
  });
});
