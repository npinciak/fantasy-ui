export function cellDataAccessor<T>(obj: T, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

export function getNestedValue(obj, keys) {
  return keys.reduce((o, k) => (o || {})[k], obj);
}

export function flatten<T>(array2D: T[][]): T[] {
  return [].concat(...array2D);
}
