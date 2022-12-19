export interface GenericPayloadActionClass<T> {
  type: string;
  new (payload: T[]): { payload: T[] };
}

export interface GenericPayloadClearActionClass {
  type: string;
  new (): unknown;
}

export function GenericActions<T>({ stateName }: { stateName: string }): IGenericActionsClass<T> {
  class GenericActionsClass {
    static readonly stateName = stateName;

    static AddOrUpdate = class {
      public static readonly type = `[${stateName}] AddOrUpdate`;
      constructor(public payload: T[]) {}
    };

    static ClearAndAdd = class {
      public static readonly type = `[${stateName}] ClearAndAdd`;
      constructor(public payload: T[]) {}
    };
  }

  return GenericActionsClass;
}

interface IGenericActionsClass<T> {
  new (...args: any[]): any;
  stateName: string;
  AddOrUpdate: GenericPayloadActionClass<T>;
  ClearAndAdd: GenericPayloadActionClass<T>;
}
