import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConnectWebSocket, DisconnectWebSocket } from '../actions/espn-fastcast.actions';
import { EspnFastcastSelectors } from '../selectors/espn-fastcast.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastFacade {
  @Select(EspnFastcastSelectors.selectConnected) connected$: Observable<number>;
  @Select(EspnFastcastSelectors.selectLastRefresh) selectLastRefresh$: Observable<number>;
  @Select(EspnFastcastSelectors.selectLastDisconnect) selectLastDisconnect$: Observable<number>;

  constructor(private store: Store) {}

  connect() {
    return this.store.dispatch(new ConnectWebSocket());
  }

  disconnect() {
    return this.store.dispatch(new DisconnectWebSocket());
  }
}
