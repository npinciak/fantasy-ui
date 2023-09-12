
export function objectIsEmpty<T>(obj: T): boolean;
export function objectIsEmpty(obj: null | undefined): boolean;
export function objectIsEmpty<T>(obj: T | null | undefined): boolean {
  if (obj == undefined || obj == null) return true;
  if (Object.keys(obj).length <= 0 && (obj as Object).constructor === Object) return true;
  return false;
}


export function normalizeStringToNumber(str: string | undefined | null): number | null {
  if (str == undefined || str == null) return null;

  const dirty = str.replace(/[&/\\#,+()$~%'":*?<>{}]/g, '');

  return Number(dirty);
}

export function flatten<T extends Object>(arr: (T[] | undefined)[]): T[] | undefined;
export function flatten<T extends Object>(arr: T[][]): T[] {
  if (arr == undefined) return [];
  return ([] as T[]).concat(...arr);
}
