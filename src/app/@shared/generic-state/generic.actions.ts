export interface GenericPayloadPatchActionClass<T> {
  type: string;
  new (payload: T[]): { payload: T[] };
}

export interface GenericPayloadFetchActionClass<T> {
  type: string;
  new (payload: T): { payload: T };
}
