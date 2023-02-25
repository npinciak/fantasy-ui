import { camelCase } from 'lodash';
import { CamelCasedProperties } from '../models/camel-case.model';

export function cellDataAccessor(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

export function getNestedValue<T>(obj: T, keys): T {
  return keys.reduce((o, k) => (o || {})[k], obj);
}

export function objectIsEmpty<T>(obj: T): boolean;
export function objectIsEmpty(obj: null | undefined): boolean;
export function objectIsEmpty<T>(obj: T | null | undefined): boolean {
  if (obj == undefined || obj == null) return true;
  if (Object.keys(obj).length <= 0 && (obj as Object).constructor === Object) return true;
  return false;
}

export function transformPropsToCamelCase<T extends Object>(obj: Object): CamelCasedProperties<T> {
  const map = {} as CamelCasedProperties<T>;

  Object.keys(obj).forEach(k => {
    map[camelCase(k)] = obj[k];
  });

  return map;
}

export function normalizePropsFromStrToNum<T>(obj: T | null | undefined): CamelCasedProperties<T> | null {
  if (obj === undefined || obj === null) return null;
  const map = {} as CamelCasedProperties<T>;
  Object.keys(obj).forEach(k => {
    obj[camelCase(k)] = normalizeStringToNumber(obj[k]);
  });
  return map;
}

export function normalizeStringToNumber(str: string | undefined | null): number | null {
  if (str == undefined || str == null) return null;

  const dirty = str.replace(/[&/\\#,+()$~%'":*?<>{}]/g, '');

  return Number(dirty);
}

export function normalizeNestedToCamelCase<T extends Object>(obj: T): Record<string, unknown> {
  function myFunction(obj: T): Record<string, unknown> {
    const map = {};
    Object.keys(obj).forEach(k => {
      if (typeof obj[k] === 'object') {
        map[k] = myFunction(obj[k]);
      } else {
        map[camelCase(k)] = obj[k];
      }
    });
    return map as Record<string, unknown>;
  }
  return myFunction(obj);
}

export function flatten<T extends Object>(arr: (T[] | undefined)[]): T[] | undefined;
export function flatten<T extends Object>(arr: T[][]): T[] {
  if (arr == undefined) return [];
  return ([] as T[]).concat(...arr);
}
