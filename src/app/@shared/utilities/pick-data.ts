/**
 * Pick data from key `U`, from dataset `T[]`
 * @param data
 * @param getter
 * @returns
 */
export function pickData<T, U>(data: T[], getter: (t: T) => any): U[] {
  return data.map(d => {
    if (getter(d) !== undefined) return getter(d);
    return [];
  });
}
