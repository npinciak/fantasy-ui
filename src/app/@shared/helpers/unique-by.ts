export function unique<T extends string | number | boolean>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Get unique obj in arr
 *
 * @param array
 * @param getter
 * @returns
 */
export function uniqueBy<T, U extends string | number>(array: T[], getter: (t: T) => U): T[] {
  const dict = array.reduce((acc, t) => {
    const u = getter(t).toString();
    if (!(u in acc)) acc[u] = t;
    return acc;
  }, {} as { [key: string]: T });
  return Object.values(dict);
}
