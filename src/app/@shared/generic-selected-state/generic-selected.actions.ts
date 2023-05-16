import { ISelectedActionClass, IdsPayload } from './generic-selected.model';

export function GenericSelectedActions({ stateName }: { stateName: string }): ISelectedActionClass {
  class GenericSelectedActionsClass {
    static readonly stateName = stateName;

    static selectAction = class {
      public static readonly type = `[${stateName}] SelectAction`;
      constructor(public payload: IdsPayload) {}
    };

    static deselectAction = class {
      public static readonly type = `[${stateName}] DeselectAction`;
      constructor(public payload: IdsPayload) {}
    };

    static toggleAction = class {
      public static readonly type = `[${stateName}] ToggleAction`;
      constructor(public payload: IdsPayload) {}
    };

    static toggleOffAction = class {
      public static readonly type = `[${stateName}] ToggleOffAction`;
      constructor(public payload: IdsPayload) {}
    };

    static clearAction = class {
      public static readonly type = `[${stateName}] ClearAction`;
    };
  }

  return GenericSelectedActionsClass;
}
