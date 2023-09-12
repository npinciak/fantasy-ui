import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/store/router/router.selectors';

import { Action, State, StateContext, Store } from '@ngxs/store';
import { FootballLineupSlot } from '@sports-ui/ui-sdk/espn';
import { PLAYER_AVAILABILITY_STATUS, PlayerAvailabilityStatus } from '@sports-ui/ui-sdk/espn-client';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { SetLineupSlotId, SetPagination, SetScoringPeriodId } from '../actions/fantasy-football-free-agent-filter.actions';
import { FantasyFootballFreeAgent } from '../actions/fantasy-football-free-agent.actions';

interface BaseFreeAgentFilterMetaData {
  sortStatId: string;
  sortDirection: string;
  currentPageSize: number;
  currentPageIndex: number;
}

export interface FantasyFootballFreeAgentFilterStateModel {
  filterInjured: boolean;
  sortDirection: string;
  availabilityStatus: Record<PlayerAvailabilityStatus, boolean>;
  lineupSlotIds: { [key in FootballLineupSlot]: boolean };
  lineupSlotId: FootballLineupSlot;
  scoringPeriodId: string | null;
  /** @deprecated use scoringPeriodId */
  topScoringPeriodIds: Record<string, boolean>;
  sortStatId: Record<string, boolean>;
  metaData: BaseFreeAgentFilterMetaData;
}

@State({
  name: 'fantasyFootballFreeAgentsFilter',
  defaults: {
    filterInjured: false,
    availabilityStatus: {
      [PLAYER_AVAILABILITY_STATUS.FreeAgent]: true,
    },
    lineupSlotIds: {},
    lineupSlotId: FootballLineupSlot.QB,

    topScoringPeriodIds: {},
    scoringPeriodId: '002022',
    metaData: {
      sortDirection: 'desc',
      currentPageSize: 100,
      currentPageIndex: 0,
    },
  },
})
@Injectable()
export class FantasyFootballFreeAgentsFilterState {
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

  @Action(SetScoringPeriodId)
  setScoringPeriodId(
    { patchState }: StateContext<FantasyFootballFreeAgentFilterStateModel>,
    { payload: { scoringPeriodId } }: SetScoringPeriodId
  ) {
    patchState({ scoringPeriodId });
  }
}
