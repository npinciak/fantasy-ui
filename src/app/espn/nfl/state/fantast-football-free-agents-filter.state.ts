import { Injectable } from '@angular/core';
import { FreeAgentAvailabilityStatus } from '@client/espn-client.model';
import { Action, State, StateContext, StateOperator } from '@ngxs/store';
import { FootballLineupSlot } from '../models/football-lineup.model';

export class PatchPlayerAvailabilityStatus {
  static readonly type = '[fantasyFootballFreeAgentsFilter] PatchPlayerAvailabilityStatus';
  constructor(public payload: string) {}
}

export class SetPagination {
  static readonly type = '[fantasyFootballFreeAgentsFilter] SetPagination';
  constructor(public payload: { sortStatId: string; sortDirection: string; currentPageSize: number; currentPageIndex: number }) {}
}

export class ToggleScoringPeriodIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] PatchScoringPeriodIds';
  constructor(public payload: { scoringPeriodIds: string[] }) {}
}

export class ToggleStatIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] ToggleStatIds';
  constructor(public payload: { statIds: string[] }) {}
}

export class ToggleLineupSlotIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] ToggleLineupSlotIds';
  constructor(public payload: { lineupSlotIds: FootballLineupSlot[] }) {}
}

export class RemovePlayerAvailabilityStatus {
  static readonly type = '[fantasyFootballFreeAgentsFilter] RemovePlayerAvailabilityStatus';
  constructor(public collectionIndex: number) {}
}

export class RemoveScoringPeriodIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] RemoveScoringPeriodIds';
  constructor(public collectionIndex: number) {}
}

export class RemoveLineupSlotIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] RemoveLineupSlotIds';
  constructor(public payload: { lineupSlotIds: FootballLineupSlot[] }) {}
}

export interface FantasyFootballFreeAgentsFilterStateModel {
  availabilityStatus: { [key in FreeAgentAvailabilityStatus]: boolean };
  lineupSlotIds: { [key in FootballLineupSlot]: boolean };
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
  name: 'fantasyFootballFreeAgentsFilter',
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
export class FantasyFootballFreeAgentsFilterState {
  constructor() {}

  @Action(ToggleStatIds)
  toggleStatId({ setState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>, { payload: { statIds } }: ToggleStatIds) {
    setState(toggle('sortStatId', statIds));
  }

  @Action(SetPagination)
  setSortDirection(
    { patchState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { payload: { sortStatId, sortDirection, currentPageSize, currentPageIndex } }: SetPagination
  ) {
    patchState({ metaData: { sortStatId, sortDirection, currentPageSize, currentPageIndex } });
  }

  @Action(ToggleLineupSlotIds)
  toggleLineupSlotIds(
    { setState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { payload: { lineupSlotIds } }: ToggleLineupSlotIds
  ) {
    setState(toggle('lineupSlotIds', lineupSlotIds));
  }

  @Action(RemoveLineupSlotIds)
  removeLineupSlotIds(
    { setState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { payload: { lineupSlotIds } }: RemoveLineupSlotIds
  ): void {
    setState(toggleOff('lineupSlotIds', lineupSlotIds));
  }

  @Action(PatchPlayerAvailabilityStatus)
  patchPlayerAvailabilityStatus(
    { setState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { payload }: PatchPlayerAvailabilityStatus
  ) {
    // setState(patch({ availabilityStatus: append([payload]) }));
  }

  @Action(RemovePlayerAvailabilityStatus)
  removePlayerAvailabilityStatus(
    { setState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { collectionIndex }: RemovePlayerAvailabilityStatus
  ): void {
    // setState(patch({ availabilityStatus: removeItem(collectionIndex) }));
  }

  @Action(ToggleScoringPeriodIds)
  patchScoringPeriodIds(
    { setState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { payload: { scoringPeriodIds } }: ToggleScoringPeriodIds
  ) {
    // setState(toggleOff('filterScoringPeriodIds', scoringPeriodIds));
  }

  @Action(RemoveScoringPeriodIds)
  removeScoringPeriodIds(
    { setState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { collectionIndex }: RemoveScoringPeriodIds
  ): void {
    // setState(patch({ filterScoringPeriodIds: removeItem(collectionIndex) }));
  }
}

export function toggle(property: string, idsToToggle: (string | number)[]): StateOperator<FantasyFootballFreeAgentsFilterStateModel> {
  return (state: Readonly<FantasyFootballFreeAgentsFilterStateModel>) => {
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

export function toggleOff(property: string, idsToToggleOff: (string | number)[]): StateOperator<FantasyFootballFreeAgentsFilterStateModel> {
  return (state: Readonly<FantasyFootballFreeAgentsFilterStateModel>) => {
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
