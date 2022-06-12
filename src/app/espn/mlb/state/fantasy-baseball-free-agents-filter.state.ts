import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateOperator } from '@ngxs/store';

export class PatchPlayerAvailabilityStatus {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] PatchPlayerAvailabilityStatus';
  constructor(public payload: string) {}
}

export class ToggleScoringPeriodIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] PatchScoringPeriodIds';
  constructor(public payload: { scoringPeriodIds: string[] }) {}
}

export class ToggleLineupSlotIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] ToggleLineupSlotIds';
  constructor(public payload: { lineupSlotIds: number[] }) {}
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
  constructor(public payload: { lineupSlotIds: number[] }) {}
}

export interface FantasyBaseballFreeAgentsFilterStateModel {
  availabilityStatus: { [id: string]: boolean };
  lineupSlotIds: { [id: number]: boolean };
  scoringPeriodIds: { [id: string]: boolean };
  metaData: any;
}

@State({
  name: 'fantasyBaseballFreeAgentsFilter',
  defaults: {
    availabilityStatus: {
      FREEAGENT: true,
      WAIVERS: true,
    },
    lineupSlotIds: {}, //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 19],
    scoringPeriodIds: {},
    metaData: {},
  },
})
@Injectable()
export class FantasyBaseballFreeAgentsFilterState {
  constructor() {}

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
  patchScoringPeriodIds({ setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>, { payload }: ToggleScoringPeriodIds) {
    // setState(patch({ filterScoringPeriodIds: append([payload]) }));
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
    const { availabilityStatus, lineupSlotIds, scoringPeriodIds, metaData } = state;

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
