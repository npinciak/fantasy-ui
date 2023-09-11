import { exists, existsFilter } from './exists';

describe('exists', () => {
  it('should return true', () => {
    const obj = { val: 1 };

    const actual = exists(obj.val);

    expect(actual).toBeTrue();
  });

  it('null should return false', () => {
    const objNull = { val: null };

    const actual = exists(objNull.val);

    expect(actual).toBeFalse();
  });

  it('undefined should return false', () => {
    const objUndefined = {};
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const actual = exists(objUndefined['j']);
    expect(actual).toBeFalse();
  });
});

describe('existsFilter', () => {
  it('should remove nulls from array', () => {
    const expected = [1, 2, 3];
    const actual = existsFilter([1, 2, 3, null]);
    expect(actual).toEqual(expected);
  });
});
