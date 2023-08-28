import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { FootballLineupSlot } from '@sports-ui/ui-sdk/espn';
import { SetLineupSlotId } from '../actions/fantasy-football-free-agent-filter.actions';
import { FantasyFootballFreeAgentFilterSelector } from '../selectors/fantasy-football-free-agent-filter.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsFilterFacade {
  selectedLineupSlotId$ = select(FantasyFootballFreeAgentFilterSelector.slices.lineupSlotId);
  selectedAvailabilityStatus$ = select(FantasyFootballFreeAgentFilterSelector.getSelectedAvailabilityStatus);

  metaData$ = select(FantasyFootballFreeAgentFilterSelector.slices.metaData);

  isSelectedAvailabilityStatusToggled$ = select(FantasyFootballFreeAgentFilterSelector.isSelectedAvailabilityStatusToggled);
  isSelectedAvailabilityStatusSelected$ = select(FantasyFootballFreeAgentFilterSelector.isSelectedAvailabilityStatusSelected);
  isSelectedLineupSlotIdToggled$ = select(FantasyFootballFreeAgentFilterSelector.isSelectedLineupSlotIdToggled);
  isSelectedLineupSlotIdSelected$ = select(FantasyFootballFreeAgentFilterSelector.isSelectedLineupSlotIdSelected);
  toggledLineupSlotIds$ = select(FantasyFootballFreeAgentFilterSelector.getToggledLineupSlotIds);
  toggledAvailabilityStatusIds$ = select(FantasyFootballFreeAgentFilterSelector.getToggledAvailabilityStatusIds);

  constructor(private store: Store) {}

  get injured() {
    return this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.slices.filterInjured);
  }

  get selectedLineupSlotId() {
    return this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.slices.lineupSlotId);
  }

  get selectedAvailabilityStatus() {
    return this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.getSelectedAvailabilityStatus);
  }

  get metaData() {
    return this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.slices.metaData);
  }

  setLineupSlotId(lineupSlotId: FootballLineupSlot) {
    return this.store.dispatch(new SetLineupSlotId({ lineupSlotId }));
  }
}
