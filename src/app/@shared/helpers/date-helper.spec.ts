import { DateHelper } from './date-helper';

describe('DateHelper', () => {
  const MOCK_DATE = new Date('2023/05/01');

  const mockDateTime = MOCK_DATE.getTime();

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(MOCK_DATE);
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  describe('#formatWithDelimiter', () => {
    it('should format a date with a delimiter', () => {
      const dateHelper = new DateHelper();
      const expected = '2023-05-01';
      const actual = dateHelper.formatWithDelimiter({ date: mockDateTime, delimiter: '-' });
      expect(actual).toBe(expected);
    });

    it('should format a date without a delimiter', () => {
      const dateHelper = new DateHelper();
      const expected = '20230501';
      const actual = dateHelper.formatWithDelimiter({ date: mockDateTime });
      expect(actual).toBe(expected);
    });
  });

  describe('#addHours', () => {
    it('should add hours to a date', () => {
      const dateHelper = new DateHelper();
      const expected = new Date(2023, 4, 1, 5, 0, 0);
      const actual = dateHelper.addHours(mockDateTime, 5);
      expect(actual).toEqual(expected);
    });
  });

  describe('#subtractYears', () => {
    it('should subtract years from a date', () => {
      const dateHelper = new DateHelper();
      const expected = new Date('2021/05/01');
      const actual = dateHelper.subtractYears(mockDateTime, 2);
      expect(actual).toEqual(expected);
    });
  });

  describe('#getYesterday', () => {
    it('should get yesterday', () => {
      const dateHelper = new DateHelper();
      const yesterday = dateHelper.getYesterday();
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - 1);
      expect(yesterday).toEqual(expectedDate);
    });
  });

  describe('#getTomorrow', () => {
    it('should get tomorrow', () => {
      const dateHelper = new DateHelper();
      const tomorrow = dateHelper.getTomorrow();
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() + 1);
      expect(tomorrow).toEqual(expectedDate);
    });
  });
});
