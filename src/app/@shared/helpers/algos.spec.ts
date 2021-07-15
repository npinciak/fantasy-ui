import { binarySearch, insertionSortDesc } from './algos';

describe('[Algo] Insertion Sort', () => {
  it('should return empty arr if array size is 0', () => {
    const actual = insertionSortDesc([], 'liveScore');
    const expected = 0;
    expect(actual).toEqual([]);
    expect(actual.length).toEqual(expected);
  });

  it('should return empty arr if array is object', () => {
    const actual = insertionSortDesc({}, 'liveScore');
    expect(actual).toEqual([]);
  });

  it('should return empty array if input is number', () => {
    const actual = insertionSortDesc(4, 'liveScore');
    expect(actual).toEqual([]);
  });

  it('should return array largest -> small', () => {
    const teams = [
      { id: 211, name: 'test1', liveScore: 45 },
      { id: 213, name: 'test3', liveScore: 14 },
      { id: 212, name: 'test2', liveScore: 85 },
    ];

    const expected = [
      { id: 212, name: 'test2', liveScore: 85 },
      { id: 211, name: 'test1', liveScore: 45 },
      { id: 213, name: 'test3', liveScore: 14 },
    ];

    const actual = insertionSortDesc(teams, 'liveScore');
    expect(actual).toEqual(expected);
  });

  it('should return array of 1 item', () => {
    const teams = [{ id: 3, name: 'test3', liveScore: 14 }];

    const expected = [{ id: 3, name: 'test3', liveScore: 14 }];

    const actual = insertionSortDesc(teams, 'liveScore');

    expect(actual.length).toEqual(1);
    expect(actual).toEqual(expected);
  });

  it('should return array if duplicates', () => {
    const teams = [
      { id: 212, name: 'test2', liveScore: 85 },
      { id: 216, name: 'test16', liveScore: 14 },
      { id: 211, name: 'test1', liveScore: 45 },
      { id: 213, name: 'test3', liveScore: 14 },
    ];

    const expected = [
      { id: 212, name: 'test2', liveScore: 85 },
      { id: 211, name: 'test1', liveScore: 45 },
      { id: 216, name: 'test16', liveScore: 14 },
      { id: 213, name: 'test3', liveScore: 14 },
    ];

    const actual = insertionSortDesc(teams, 'liveScore');
    expect(actual).toEqual(expected);
  });
});
