export const cellDataAccessor = (obj, path) => path.split('.').reduce((o, p) => o && o[p], obj);

export const getNestedValue = (obj, keys) => keys.reduce((o, k) => (o || {})[k], obj);

export const flatten = <T>(array2D: T[][]): T[] => [].concat(...array2D);
