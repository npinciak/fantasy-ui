import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  @Action(FantasyBaseballEvents.Fetch, { cancelUncompleted: true })
  fetchBaseballEvents(): Observable<void> {
    return this.mlbService.baseballEvents().pipe(
      map(events => {
        this.store.dispatch(new FantasyBaseballEvents.AddOrUpdate(events));
      })
    );
  }
}
