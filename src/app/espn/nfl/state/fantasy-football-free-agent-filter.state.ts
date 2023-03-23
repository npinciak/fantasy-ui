import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { Selector } from '@app/@shared/models/typed-selector';

import { exists } from '@app/@shared/utilities/utilities.m';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { EspnClient } from 'sports-ui-sdk/lib/espn/espn.m';
import { FootballLineupSlot } from 'sports-ui-sdk/lib/espn/football/lineup/lineup.m';
import { PLAYER_AVAILABILITY_STATUS } from 'sports-ui-sdk/lib/espn/models/espn-client.const';
import { SetLineupSlotId, SetPagination, TogglePlayerAvailabilityStatus } from '../actions/fantasy-football-free-agent-filter.actions';
import { FantasyFootballFreeAgent } from '../actions/fantasy-football-free-agent.actions';

interface BaseFreeAgentFilterMetaData {
  sortStatId: string;
  sortDirection: string;
  currentPageSize: number;
  currentPageIndex: number;
}

export interface FantasyFootballFreeAgentFilterStateModel {
  sortDirection: string;
  availabilityStatus: Record<EspnClient.PlayerAvailabilityStatus, boolean>;
  lineupSlotId: FootballLineupSlot;
  topScoringPeriodIds: Record<string, boolean>;
  sortStatId: Record<string, boolean>;
  metaData: BaseFreeAgentFilterMetaData;
}

@State({
  name: 'fantasyFootballFreeAgentFilter',
  defaults: {
    availabilityStatus: {
      [PLAYER_AVAILABILITY_STATUS.FreeAgent]: true,
      [PLAYER_AVAILABILITY_STATUS.Waivers]: true,
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
export class FantasyFootballFreeAgentFilterState {
  @Selector([FantasyFootballFreeAgentFilterState])
  static getSelectedLineupSlotId(state: FantasyFootballFreeAgentFilterStateModel) {
    return state.lineupSlotId;
  }

  @Selector([FantasyFootballFreeAgentFilterState])
  static getAvailabilityStatus(state: FantasyFootballFreeAgentFilterStateModel) {
    return state.availabilityStatus;
  }

  constructor(private store: Store) {}

  @Action(SetPagination)
  setSortDirection(
    { patchState }: StateContext<FantasyFootballFreeAgentFilterStateModel>,
    { payload: { sortStatId, sortDirection, currentPageSize, currentPageIndex } }: SetPagination
  ) {
    patchState({ metaData: { sortStatId, sortDirection, currentPageSize, currentPageIndex } });
  }

  @Action(SetLineupSlotId)
  setLineupSlotId({ patchState }: StateContext<FantasyFootballFreeAgentFilterStateModel>, { payload: { lineupSlotId } }: SetLineupSlotId) {
    patchState({ lineupSlotId });
    const leagueId = this.store.selectSnapshot(RouterSelector.getLeagueId);
    const season = this.store.selectSnapshot(RouterSelector.getSeason);

    if (!exists(leagueId)) throw new Error('leagueId cannot be null');
    if (!exists(season)) throw new Error('season cannot be null');

    this.store.dispatch(new FantasyFootballFreeAgent.Fetch({ leagueId, season }));
  }

  @Action(TogglePlayerAvailabilityStatus)
  togglePlayerAvailabilityStatus(
    { patchState }: StateContext<FantasyFootballFreeAgentFilterStateModel>,
    { payload: { availabilityStatus } }: TogglePlayerAvailabilityStatus
  ) {
    // patchState({ availabilityStatus });
    // setState(patch({ availabilityStatus: append([payload]) }));
  }
}
