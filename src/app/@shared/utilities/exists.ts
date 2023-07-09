export function exists<T>(value: NonNullable<T> | null | undefined): value is NonNullable<T> {
  return value != null;
}

export function existsFilter<T>(value: (NonNullable<T> | null | undefined)[]): NonNullable<T>[] {
  let index = 0;
  for (let i = 0; i < value.length; i++) {
    if (exists(value[i])) {
      value[index] = value[i];
      index++;
    }
  }
  value.length = index;
  return value as NonNullable<T>[];
}
