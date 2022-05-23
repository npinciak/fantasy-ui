import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConnectWebSocket, DisconnectWebSocket, SetSelectedEventType } from '../actions/espn-fastcast.actions';
import { EspnFastcastSelectors } from '../selectors/espn-fastcast.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastFacade {
  @Select(EspnFastcastSelectors.getEventType) eventType$: Observable<string | null>;
  @Select(EspnFastcastSelectors.getConnected) connected$: Observable<number | null>;
  @Select(EspnFastcastSelectors.getLastRefresh) selectLastRefresh$: Observable<number | null>;
  @Select(EspnFastcastSelectors.getLastDisconnect) selectLastDisconnect$: Observable<number | null>;

  constructor(private store: Store) {}

  connect(): Observable<void> {
    return this.store.dispatch(new ConnectWebSocket());
  }

  disconnect(): Observable<void> {
    return this.store.dispatch(new DisconnectWebSocket());
  }

  setEventType(eventType: string | null): Observable<void> {
    return this.store.dispatch(new SetSelectedEventType({ eventType }));
  }
}
