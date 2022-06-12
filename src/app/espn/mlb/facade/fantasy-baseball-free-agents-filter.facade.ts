import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchFantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import {
  PatchPlayerAvailabilityStatus,
  RemoveLineupSlotIds,
  RemovePlayerAvailabilityStatus,
  RemoveScoringPeriodIds,
  ToggleLineupSlotIds,
  ToggleScoringPeriodIds,
} from '../state/fantasy-baseball-free-agents-filter.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFilterFacade {
  constructor(private store: Store) {}

  toggleFilterSlotIds(lineupSlotIds: number[], leagueId: number, scoringPeriodId: string): Observable<void> {
    return this.store.dispatch([
      new ToggleLineupSlotIds({ lineupSlotIds }),
      new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }),
    ]);
  }

  togglePlayerAvailabilityStatus(status: string): Observable<void> {
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
