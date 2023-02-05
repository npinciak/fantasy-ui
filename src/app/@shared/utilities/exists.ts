export function exists<T>(value: NonNullable<T> | null | undefined): value is NonNullable<T> {
  return value != null;
}

export function existsFilter<T>(value: (NonNullable<T> | null | undefined)[]): NonNullable<T>[] {
  const result: NonNullable<T>[] = [];
  value.forEach(o => {
    if (exists(o)) result.push(o);
  });
  return result;
}
