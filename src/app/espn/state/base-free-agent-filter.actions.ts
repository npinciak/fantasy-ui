import { BaseballLineupSlot, PlayerAvailabilityStatus } from 'sports-ui-sdk';

export interface FreeAgentsFilterStateModel {
  availabilityStatus: { [key in PlayerAvailabilityStatus]: boolean };
  lineupSlotIds: { [key in BaseballLineupSlot]: boolean };
  topScoringPeriodIds: { [id: string]: boolean };
  metaData: {
    sortStatId: string;
    sortDirection: string;
    currentPageSize: number;
    currentPageIndex: number;
  };
}

export interface IBaseFreeAgentFilterActionsClass {
  new (...args: any[]): any;
  stateName: string;
  SetPlayerAvailabilityStatus: GenericSetActionClass<PlayerAvailabilityStatus>;
}

export interface GenericSetActionClass<T> {
  type: string;
  new (payload: T): { payload: T };
}

export function BaseFreeAgentFilterActions({ stateName }: { stateName: string }): IBaseFreeAgentFilterActionsClass {
  class BaseLeagueActionsClass {
    static readonly stateName = stateName;

    static SetPlayerAvailabilityStatus = class {
      static readonly type = `[${stateName}] PatchPlayerAvailabilityStatus`;
      constructor(public payload: PlayerAvailabilityStatus) {}
    };

    // static SetPagination = class {
    //   static readonly type = `[${stateName}] SetPagination`;
    //   constructor(public payload: { sortStatId: string; sortDirection: string; currentPageSize: number; currentPageIndex: number }) {}
    // };

    // static ToggleScoringPeriodIds = class {
    //   static readonly type = `${stateName} PatchScoringPeriodIds`;
    //   constructor(public payload: { scoringPeriodIds: string[] }) {}
    // };

    // static ToggleStatIds = class {
    //   static readonly type = `${stateName} ToggleStatIds`;
    //   constructor(public payload: { statIds: string[] }) {}
    // };

    // static ToggleLineupSlotIds = class {
    //   static readonly type = `${stateName} ToggleLineupSlotIds`;
    //   constructor(public payload: { lineupSlotIds: BaseballLineupSlot[] }) {}
    // };

    // static RemovePlayerAvailabilityStatus = class {
    //   static readonly type = `${stateName} RemovePlayerAvailabilityStatus`;
    //   constructor(public collectionIndex: number) {}
    // };

    // static RemoveScoringPeriodIds = class {
    //   static readonly type = `${stateName} RemoveScoringPeriodIds`;
    //   constructor(public collectionIndex: number) {}
    // };

    // static RemoveLineupSlotIds = class {
    //   static readonly type = `${stateName} RemoveLineupSlotIds`;
    //   constructor(public payload: { lineupSlotIds: BaseballLineupSlot[] }) {}
    // };
  }

  return BaseLeagueActionsClass;
}
