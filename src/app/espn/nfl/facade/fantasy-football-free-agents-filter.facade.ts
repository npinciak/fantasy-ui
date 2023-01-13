import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { FootballLineupSlot } from 'sports-ui-sdk';
import { SetLineupSlotId } from '../actions/fantasy-football-free-agents-filter.actions';
import { FantasyFootballFreeAgentsFilterState } from '../state/fantasy-football-free-agents-filter.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsFilterFacade {
  selectedLineupSlotId$ = select(FantasyFootballFreeAgentsFilterState.getSelectedLineupSlotId);

  constructor(private store: Store) {}

  setLineupSlotId(lineupSlotId: FootballLineupSlot) {
    return this.store.dispatch(new SetLineupSlotId({ lineupSlotId }));
  }
}
