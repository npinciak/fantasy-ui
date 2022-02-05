import { camelCase } from 'lodash';
import { CamelCasedProperties } from '../models/camel-case.model';

export function cellDataAccessor<T>(obj: T, path): T {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

export function getNestedValue<T>(obj: T, keys): T {
  return keys.reduce((o, k) => (o || {})[k], obj);
}

export function flatten<T>(array2D: T[][]): T[] {
  return [].concat(...array2D);
}

export function objectIsEmpty<T>(obj: T): boolean {
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }
  return false;
}

export function transformToCamelCase<T>(obj: T): CamelCasedProperties<T> {
  const map = {} as CamelCasedProperties<T>;
  Object.keys(obj).forEach(k => {
    obj[camelCase(k)] = obj[k];
  });

  return map;
}

export function transformPercToNumber(str: string): number {
  if (str !== undefined) {
    return Number(str.split('%')[0]);
  }
  return null;
}

export function transformNestedToCamelCase<T>(obj: T): {} {
  function myFunction(obj: T) {
    const map = {};
    Object.keys(obj).forEach(k => {
      if (typeof obj[k] === 'object') {
        map[k] = myFunction(obj[k]);
      } else {
        map[camelCase(k)] = obj[k];
      }
    });
    return map;
  }
  return myFunction(obj);
}
