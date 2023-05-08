import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, Store } from '@ngxs/store';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { MlbService } from '../services/mlb.service';

@State({ name: FantasyBaseballEvents.stateName })
@Injectable()
export class FantasyBaseballEventsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballEvents,
}) {
  constructor(private mlbService: MlbService, private store: Store) {
    super();
  }

  @Action(FantasyBaseballEvents.Fetch)
  async fetchBaseballEvents(): Promise<void> {
    const events = await this.mlbService.baseballEvents().toPromise();
    this.store.dispatch(new FantasyBaseballEvents.AddOrUpdate(events));
  }
}
