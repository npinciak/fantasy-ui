import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnClient, FootballLineupSlot } from 'sports-ui-sdk';

import { exists } from '@app/@shared/helpers/utils';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { SetLineupSlotId, SetPagination, TogglePlayerAvailabilityStatus } from '../actions/fantasy-football-free-agents-filter.actions';
import { FantasyFootballFreeAgents } from '../actions/fantasy-football-free-agents.actions';

interface BaseFreeAgentFilterMetaData {
  sortStatId: string;
  sortDirection: string;
  currentPageSize: number;
  currentPageIndex: number;
}

export interface FantasyFootballFreeAgentsFilterStateModel {
  sortDirection: string;
  availabilityStatus: Record<EspnClient.FreeAgentAvailabilityStatus, boolean>;
  lineupSlotId: FootballLineupSlot;
  topScoringPeriodIds: Record<string, boolean>;
  sortStatId: Record<string, boolean>;
  metaData: BaseFreeAgentFilterMetaData;
}

@State({
  name: 'fantasyFootballFreeAgentsFilter',
  defaults: {
    availabilityStatus: {
      [EspnClient.FreeAgentAvailabilityStatus.FreeAgent]: true,
      [EspnClient.FreeAgentAvailabilityStatus.Waivers]: true,
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
    const leagueId = this.store.selectSnapshot(RouterSelector.getLeagueId);
    const season = this.store.selectSnapshot(RouterSelector.getSeason);

    if (!exists(leagueId)) throw new Error('leagueId cannot be null');
    if (!exists(season)) throw new Error('season cannot be null');

    this.store.dispatch(new FantasyFootballFreeAgents.Fetch({ leagueId, season }));
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
