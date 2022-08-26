import { Injectable } from '@angular/core';
import { FreeAgentAvailabilityStatus } from '@client/espn-client.model';
import { Action, State, StateContext, StateOperator } from '@ngxs/store';
import { BaseballLineupSlot } from '../consts/lineup.const';

export class PatchPlayerAvailabilityStatus {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] PatchPlayerAvailabilityStatus';
  constructor(public payload: FreeAgentAvailabilityStatus) {}
}

export class SetPagination {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] SetPagination';
  constructor(public payload: { sortStatId: string; sortDirection: string; currentPageSize: number; currentPageIndex: number }) {}
}

export class ToggleScoringPeriodIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] PatchScoringPeriodIds';
  constructor(public payload: { scoringPeriodIds: string[] }) {}
}

export class ToggleStatIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] ToggleStatIds';
  constructor(public payload: { statIds: string[] }) {}
}

export class ToggleLineupSlotIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] ToggleLineupSlotIds';
  constructor(public payload: { lineupSlotIds: BaseballLineupSlot[] }) {}
}

export class RemovePlayerAvailabilityStatus {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] RemovePlayerAvailabilityStatus';
  constructor(public collectionIndex: number) {}
}

export class RemoveScoringPeriodIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] RemoveScoringPeriodIds';
  constructor(public collectionIndex: number) {}
}

export class RemoveLineupSlotIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] RemoveLineupSlotIds';
  constructor(public payload: { lineupSlotIds: BaseballLineupSlot[] }) {}
}

export interface FantasyBaseballFreeAgentsFilterStateModel {
  availabilityStatus: { [key in FreeAgentAvailabilityStatus]: boolean };
  lineupSlotIds: { [key in BaseballLineupSlot]: boolean };
  topScoringPeriodIds: { [id: string]: boolean };
  sortStatId: { [id: string]: boolean };
  sortDirection: string;
  metaData: {
    sortStatId: string;
    sortDirection: string;
    currentPageSize: number;
    currentPageIndex: number;
  };
}

@State({
  name: 'fantasyBaseballFreeAgentsFilter',
  defaults: {
    availabilityStatus: {
      [FreeAgentAvailabilityStatus.FreeAgent]: true,
      [FreeAgentAvailabilityStatus.Waivers]: true,
    },
    lineupSlotIds: {},
    topScoringPeriodIds: {},
    metaData: {
      sortDirection: 'desc',
      currentPageSize: 100,
      currentPageIndex: 0,
    },
  },
})
@Injectable()
export class FantasyBaseballFreeAgentsFilterState {
  constructor() {}

  @Action(ToggleStatIds)
  toggleStatId({ setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>, { payload: { statIds } }: ToggleStatIds) {
    setState(toggle('sortStatId', statIds));
  }

  @Action(SetPagination)
  setSortDirection(
    { patchState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { payload: { sortStatId, sortDirection, currentPageSize, currentPageIndex } }: SetPagination
  ) {
    patchState({ metaData: { sortStatId, sortDirection, currentPageSize, currentPageIndex } });
  }

  @Action(ToggleLineupSlotIds)
  toggleLineupSlotIds(
    { setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { payload: { lineupSlotIds } }: ToggleLineupSlotIds
  ) {
    setState(toggle('lineupSlotIds', lineupSlotIds));
  }

  @Action(RemoveLineupSlotIds)
  removeLineupSlotIds(
    { setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { payload: { lineupSlotIds } }: RemoveLineupSlotIds
  ): void {
    setState(toggleOff('lineupSlotIds', lineupSlotIds));
  }

  @Action(PatchPlayerAvailabilityStatus)
  patchPlayerAvailabilityStatus(
    { setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { payload }: PatchPlayerAvailabilityStatus
  ) {
    // setState(patch({ availabilityStatus: append([payload]) }));
  }

  @Action(RemovePlayerAvailabilityStatus)
  removePlayerAvailabilityStatus(
    { setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { collectionIndex }: RemovePlayerAvailabilityStatus
  ): void {
    // setState(patch({ availabilityStatus: removeItem(collectionIndex) }));
  }

  @Action(ToggleScoringPeriodIds)
  patchScoringPeriodIds(
    { setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { payload: { scoringPeriodIds } }: ToggleScoringPeriodIds
  ) {
    // setState(toggleOff('filterScoringPeriodIds', scoringPeriodIds));
  }

  @Action(RemoveScoringPeriodIds)
  removeScoringPeriodIds(
    { setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { collectionIndex }: RemoveScoringPeriodIds
  ): void {
    // setState(patch({ filterScoringPeriodIds: removeItem(collectionIndex) }));
  }
}

export function toggle(property: string, idsToToggle: (string | number)[]): StateOperator<FantasyBaseballFreeAgentsFilterStateModel> {
  return (state: Readonly<FantasyBaseballFreeAgentsFilterStateModel>) => {
    const ids = idsToToggle.reduce(
      (acc, id) => {
        acc[id] = !acc[id];
        return acc;
      },
      { ...state[property] }
    );

    return { ...state, [property]: ids };
  };
}

export function toggleOff(property: string, idsToToggleOff: (string | number)[]): StateOperator<FantasyBaseballFreeAgentsFilterStateModel> {
  return (state: Readonly<FantasyBaseballFreeAgentsFilterStateModel>) => {
    const { availabilityStatus, lineupSlotIds, topScoringPeriodIds: scoringPeriodIds, metaData } = state;

    const existingToToggleOff = idsToToggleOff.filter(id => id in [property]);

    const toggledOff = existingToToggleOff.reduce((acc, id) => {
      acc[id] = false;
      return acc;
    }, {});
    const newIds = { ...[property], ...toggledOff };

    return { ...state, [property]: newIds };
    // return { [property]: newIds };
  };
}
