import { Injectable } from '@angular/core';

import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlayerAvailabilityStatus } from 'sports-ui-sdk';
import { FantasyBaseballFreeAgentFilterSelector } from '../selectors/fantasy-baseball-free-agent-filter.selector';
import {
  RemoveLineupSlotIds,
  RemovePlayerAvailabilityStatus,
  RemoveScoringPeriodIds,
  SetLineupSlotIds,
  SetPagination,
  SetPlayerAvailabilityStatus,
  SetScoringPeriodIds,
} from '../state/fantasy-baseball-free-agents-filter.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFilterFacade {
  isSelectedAvailabilityStatusToggled$ = select(FantasyBaseballFreeAgentFilterSelector.isSelectedAvailabilityStatusToggled);
  isSelectedAvailabilityStatusSelected$ = select(FantasyBaseballFreeAgentFilterSelector.isSelectedAvailabilityStatusSelected);
  isSelectedLineupSlotIdToggled$ = select(FantasyBaseballFreeAgentFilterSelector.isSelectedLineupSlotIdToggled);
  isSelectedLineupSlotIdSelected$ = select(FantasyBaseballFreeAgentFilterSelector.isSelectedLineupSlotIdSelected);
  toggledLineupSlotIds$ = select(FantasyBaseballFreeAgentFilterSelector.getToggledLineupSlotIds);
  toggledAvailabilityStatusIds$ = select(FantasyBaseballFreeAgentFilterSelector.getToggledAvailabilityStatusIds);

  constructor(private store: Store) {}

  setPagination(paginationMeta: {
    sortStatId: string;
    sortDirection: string;
    currentPageSize: number;
    currentPageIndex: number;
  }): Observable<void> {
    return this.store.dispatch([new SetPagination(paginationMeta)]);
  }

  toggleFilterSlotIds(lineupSlotIds: number): Observable<void> {
    return this.store.dispatch([new SetLineupSlotIds([lineupSlotIds])]);
  }

  togglePlayerAvailabilityStatus(status: PlayerAvailabilityStatus): Observable<void> {
    return this.store.dispatch(new SetPlayerAvailabilityStatus([status]));
  }

  setScoringPeriodIds(scoringPeriodIds: string[]): Observable<void> {
    return this.store.dispatch(new SetScoringPeriodIds(scoringPeriodIds));
  }

  removeFilterSlotIds(lineupSlotIds: number[]): Observable<void> {
    return this.store.dispatch(new RemoveLineupSlotIds({ lineupSlotIds }));
  }

  removePlayerAvailabilityStatus(collectionIndex: number): Observable<void> {
    return this.store.dispatch(new RemovePlayerAvailabilityStatus(collectionIndex));
  }

  removeScoringPeriodIds(collectionIndex: number): Observable<void> {
    return this.store.dispatch(new RemoveScoringPeriodIds(collectionIndex));
  }
}
