import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ConnectWebSocket, DisconnectWebSocket } from '../actions/espn-fastcast.actions';
import { EventsEntity } from '../models/espn-fastcast.model';
import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastSelectors } from '../selectors/espn-fastcast.selectors';
import { EspnFastcastState } from '../state/espn-fastcast.state';
@Injectable({
  providedIn: 'root',
})
export class EspnFastcastFacade {
  @Select(EspnFastcastSelectors.selectEventsMapList) selectEventsMapList$: Observable<FastcastEvent[]>;

  @Select(EspnFastcastState.selectLastRefresh) selectLastRefresh$: Observable<number>;
  @Select(EspnFastcastState.selectLastDisconnect) selectLastDisconnect$: Observable<number>;

  constructor(private store: Store) {}

  connect() {
    return this.store.dispatch(new ConnectWebSocket());
  }

  disconnect() {
    return this.store.dispatch(new DisconnectWebSocket());
  }
}
