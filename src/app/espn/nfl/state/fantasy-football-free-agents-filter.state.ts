import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnFreeAgentAvailabilityStatus } from '@espnClient/espn-client.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { SetLineupSlotId, SetPagination, TogglePlayerAvailabilityStatus } from '../actions/fantasy-football-free-agents-filter.actions';
import { FetchFantasyFootballFreeAgents } from '../actions/fantasy-football-free-agents.actions';
import { FootballLineupSlot } from '../models/football-lineup.model';

interface BaseFreeAgentFilterMetaData {
  sortStatId: string;
  sortDirection: string;
  currentPageSize: number;
  currentPageIndex: number;
}

export interface FantasyFootballFreeAgentsFilterStateModel {
  sortDirection: string;
  availabilityStatus: Record<EspnFreeAgentAvailabilityStatus, boolean>;
  lineupSlotId: FootballLineupSlot;
  topScoringPeriodIds: Record<string, boolean>;
  sortStatId: Record<string, boolean>;
  metaData: BaseFreeAgentFilterMetaData;
}

@State({
  name: 'fantasyFootballFreeAgentsFilter',
  defaults: {
    availabilityStatus: {
      [EspnFreeAgentAvailabilityStatus.FreeAgent]: true,
      [EspnFreeAgentAvailabilityStatus.Waivers]: true,
    },
    lineupSlotId: FootballLineupSlot.QB,
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
  @Selector([FantasyFootballFreeAgentsFilterState])
  static getSelectedLineupSlotId(state: FantasyFootballFreeAgentsFilterStateModel) {
    return state.lineupSlotId;
  }

  @Selector([FantasyFootballFreeAgentsFilterState])
  static getAvailabilityStatus(state: FantasyFootballFreeAgentsFilterStateModel) {
    return state.availabilityStatus;
  }

  constructor(private store: Store) {}

  @Action(SetPagination)
  setSortDirection(
    { patchState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { payload: { sortStatId, sortDirection, currentPageSize, currentPageIndex } }: SetPagination
  ) {
    patchState({ metaData: { sortStatId, sortDirection, currentPageSize, currentPageIndex } });
  }

  @Action(SetLineupSlotId)
  setLineupSlotId({ patchState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>, { payload: { lineupSlotId } }: SetLineupSlotId) {
    patchState({ lineupSlotId });
    const leagueId = this.store.selectSnapshot(RouterSelector.getLeagueId) ?? '';

    this.store.dispatch(new FetchFantasyFootballFreeAgents({ leagueId }));
  }

  @Action(TogglePlayerAvailabilityStatus)
  togglePlayerAvailabilityStatus(
    { patchState }: StateContext<FantasyFootballFreeAgentsFilterStateModel>,
    { payload: { availabilityStatus } }: TogglePlayerAvailabilityStatus
  ) {
    // patchState({ availabilityStatus });
    // setState(patch({ availabilityStatus: append([payload]) }));
  }
}
