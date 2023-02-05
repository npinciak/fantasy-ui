import { flatten } from './flatten';

describe('flatten', () => {
  it('should return flattened array', () => {
    const arr = [[1, 2]];

    const expected = [1, 2];
    const actual = flatten(arr);

    expect(actual).toEqual(expected);
  });

  it('should return empty array', () => {
    const arr = {};

    const expected = [];
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const actual = flatten(arr['innerArray']);

    expect(actual).toEqual(expected);
  });
});
