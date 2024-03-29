import { GenericPayloadActionClass, GenericPayloadFetchActionClass, IGenericActionsClass } from './generic.model';

export function GenericActions<T, U = Record<string, unknown>>({ stateName }: { stateName: string }): IGenericActionsClass<T, U> {
  class GenericActionsClass {
    static readonly stateName = stateName;

    static AddOrUpdate: GenericPayloadActionClass<T> = class {
      public static readonly type = `[${stateName}] AddOrUpdate`;
      constructor(public payload: T[]) {}
    };

    static Fetch: GenericPayloadFetchActionClass<U> = class {
      public static readonly type = `[${stateName}] Fetch`;
      constructor(public payload: U) {}
    };

    static Clear = class {
      public static readonly type = `[${stateName}] Clear`;
    };
  }

  return GenericActionsClass;
}
