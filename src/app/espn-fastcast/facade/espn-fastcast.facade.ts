import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConnectWebSocket, DisconnectWebSocket, SetSelectedEventType } from '../actions/espn-fastcast.actions';
import { EspnFastcastSelectors } from '../selectors/espn-fastcast.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastFacade {
  connected$ = select(EspnFastcastSelectors.getConnected);
  eventType$ = select(EspnFastcastSelectors.getEventType);
  lastDisconnect$ = select(EspnFastcastSelectors.getLastDisconnect);
  lastRefresh$ = select(EspnFastcastSelectors.getLastRefresh);
  isFeedValid$ = select(EspnFastcastSelectors.getIsFeedValid);
  feedLoadingValue$ = select(EspnFastcastSelectors.getFeedLoadingValue);

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
