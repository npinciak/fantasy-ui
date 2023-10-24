import { IBaseFreeAgentsFilterActionsClass, IBaseFreeAgentsFilterMetaData } from './base-free-agents-filter.model';

export function BaseFreeAgentsFilterActions({ stateName }: { stateName: string }): IBaseFreeAgentsFilterActionsClass {
  class BaseFreeAgentsFilterActionsClass {
    static readonly stateName = stateName;

    static ToggleAvailabilityStatus = class {
      static readonly type = `[${stateName}] ToggleAvailabilityStatus`;
      constructor(public payload: { ids: string[] }) {}
    };

    static ToggleLineupSlotIds = class {
      static readonly type = `[${stateName}] ToggleLineupSlotIds`;
      constructor(public payload: { ids: string[] }) {}
    };

    static ToggleTeamIds = class {
      static readonly type = `[${stateName}] ToggleTeamIds`;
      constructor(public payload: { ids: string[] }) {}
    };

    static ToggleScoringPeriodIds = class {
      static readonly type = `[${stateName}] ToggleScoringPeriodIds`;
      constructor(public payload: { ids: string[] }) {}
    };

    static SetMetaData = class {
      static readonly type = `[${stateName}] SetSortDirection`;
      constructor(public payload: { metaData: IBaseFreeAgentsFilterMetaData }) {}
    };
  }

  return BaseFreeAgentsFilterActionsClass;
}
