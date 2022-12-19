import { IGenericActionsClass } from './generic.model';

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
