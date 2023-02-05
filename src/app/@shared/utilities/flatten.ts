export function flatten<T extends any[][]>(arr: (T[] | undefined)[]): T[] | undefined;
export function flatten<T extends any[][]>(arr: T[][]) {
  if (arr == undefined) return [];
  return ([] as T[]).concat(...arr);
}

type ArrayElementType<T> = T extends (infer E)[] ? E : T;

const getSingleElementOrNull = <T extends any[]>(array: T): ArrayElementType<T> | null => {
  if (array.length === 0 || array.length > 1) return null;

  return array[0];
};
