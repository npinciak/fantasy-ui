import { Injectable } from '@angular/core';
import { BaseballLineupSlot, EspnClient, PLAYER_AVAILABILITY_STATUS } from 'sports-ui-sdk';

import { PropertyOfType } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, StateOperator, Store } from '@ngxs/store';
import { FantasyBaseballFreeAgentFilter } from '../actions/fantasy-baseball-free-agents-filter.actions';
import { FantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { FantasyBaseballLeagueFacade } from '../facade/fantasy-baseball-league.facade';

export class SetPlayerAvailabilityStatus {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] SetPlayerAvailabilityStatus';
  constructor(public availabilityStatus: EspnClient.PlayerAvailabilityStatus[]) {}
}

export class SetLineupSlotIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] SetLineupSlotIds';
  constructor(public lineupSlotIds: BaseballLineupSlot[]) {}
}

export class SetPagination {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] SetPagination';
  constructor(public payload: { sortStatId: string; sortDirection: string; currentPageSize: number; currentPageIndex: number }) {}
}

export class SetScoringPeriodIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] SetScoringPeriodIds';
  constructor(public scoringPeriodIds: string[]) {}
}

export class ToggleStatIds {
  static readonly type = '[fantasyBaseballFreeAgentsFilter] ToggleStatIds';
  constructor(public payload: { statIds: string[] }) {}
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
  filterInjured: boolean;
  availabilityStatus: { [key in EspnClient.PlayerAvailabilityStatus]: boolean };
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
  name: FantasyBaseballFreeAgentFilter.stateName,
  defaults: {
    filterInjured: false,
    availabilityStatus: {
      [PLAYER_AVAILABILITY_STATUS.FreeAgent]: true,
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
  constructor(private store: Store, private fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade) {}

  @Action(SetPlayerAvailabilityStatus)
  setPlayerAvailabilityStatus(
    { setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>,
    { availabilityStatus }: SetPlayerAvailabilityStatus
  ) {
    setState(toggle(availabilityStatus, 'availabilityStatus'));

    const leagueId = this.fantasyBaseballLeagueFacade.leagueId;

    this.store.dispatch(new FantasyBaseballFreeAgents.Fetch({ leagueId }));
  }

  @Action(SetLineupSlotIds)
  setLineupSlotIds({ setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>, { lineupSlotIds }: SetLineupSlotIds) {
    setState(toggle(lineupSlotIds, 'lineupSlotIds'));

    const leagueId = this.fantasyBaseballLeagueFacade.leagueId;

    this.store.dispatch(new FantasyBaseballFreeAgents.Fetch({ leagueId }));
  }

  @Action(SetScoringPeriodIds)
  setScoringPeriodIds({ setState }: StateContext<FantasyBaseballFreeAgentsFilterStateModel>, { scoringPeriodIds }: SetScoringPeriodIds) {
    setState(select(scoringPeriodIds, 'topScoringPeriodIds'));

    const leagueId = this.fantasyBaseballLeagueFacade.leagueId;

    //  this.store.dispatch(new FantasyBaseballFreeAgents.Fetch({ leagueId }));
  }
}

export function toggle(
  idsToToggle: (string | number)[],
  field: PropertyOfType<FantasyBaseballFreeAgentsFilterStateModel, { [id: string]: boolean }>
): StateOperator<FantasyBaseballFreeAgentsFilterStateModel> {
  return (state: Readonly<FantasyBaseballFreeAgentsFilterStateModel>) => {
    const ids = idsToToggle.reduce(
      (acc, id) => {
        acc[id] = !acc[id];
        return acc;
      },
      { ...state[field] }
    );

    return { ...state, [field]: ids };
  };
}
export function select(
  idsToSelect: (string | number)[],
  field: PropertyOfType<FantasyBaseballFreeAgentsFilterStateModel, { [id: string]: boolean }>
): StateOperator<FantasyBaseballFreeAgentsFilterStateModel> {
  return (state: Readonly<FantasyBaseballFreeAgentsFilterStateModel>) => {
    const ids = idsToSelect.reduce(
      (acc, id) => {
        acc[id] = true;
        return acc;
      },
      { ...state[field] }
    );

    return { ...state, [field]: ids };
  };
}
