import { Injectable } from '@angular/core';
import { EspnFreeAgentAvailabilityStatus } from '@client/espn-client.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchFantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import {
  PatchPlayerAvailabilityStatus,
  RemoveLineupSlotIds,
  RemovePlayerAvailabilityStatus,
  RemoveScoringPeriodIds,
  SetPagination,
  ToggleLineupSlotIds,
  ToggleScoringPeriodIds,
} from '../state/fantasy-baseball-free-agents-filter.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFilterFacade {
  constructor(private store: Store) {}

  setPagination(paginationMeta: {
    sortStatId: string;
    sortDirection: string;
    currentPageSize: number;
    currentPageIndex: number;
  }): Observable<void> {
    return this.store.dispatch([new SetPagination(paginationMeta)]);
  }

  toggleFilterSlotIds(lineupSlotIds: number[]): Observable<void> {
    return this.store.dispatch([new ToggleLineupSlotIds({ lineupSlotIds }), new FetchFantasyBaseballFreeAgents()]);
  }

  togglePlayerAvailabilityStatus(status: EspnFreeAgentAvailabilityStatus): Observable<void> {
    return this.store.dispatch(new PatchPlayerAvailabilityStatus(status));
  }

  patchScoringPeriodIds(scoringPeriodIds: string[]): Observable<void> {
    return this.store.dispatch(new ToggleScoringPeriodIds({ scoringPeriodIds }));
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
