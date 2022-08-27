import { camelCase } from 'lodash';
import { CamelCasedProperties } from '../models/camel-case.model';

export function exists<T>(value: NonNullable<T> | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function existsFilter<T>(value: (NonNullable<T> | null | undefined)[]): NonNullable<T>[] {
  const result: NonNullable<T>[] = [];
  value.forEach(o => {
    if (exists(o)) result.push(o);
  });
  return result;
}

export function cellDataAccessor(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

export function getNestedValue<T>(obj: T, keys): T {
  return keys.reduce((o, k) => (o || {})[k], obj);
}

export function objectIsEmpty<T>(obj: T): boolean {
  if (Object.keys(obj).length === 0 && (obj as Object).constructor === Object) {
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

export function transformPercToNumber(str: string): number;
export function transformPercToNumber(str: string | undefined): number | null;
export function transformPercToNumber(str: string | null): number | null;
export function transformPercToNumber(str: string | undefined | null): number | null {
  if (str == undefined || str == null) return null;
  return Number(str.split('%')[0]);
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

function flatten<T>(arr: (T[] | undefined)[]): T[] | undefined;
function flatten<T>(arr: T[][]): T[] {
  if (arr == undefined) return [];
  return ([] as T[]).concat(...arr);
}

export { flatten };
