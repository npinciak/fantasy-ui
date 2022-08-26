import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConnectWebSocket, DisconnectWebSocket, SetFastcastPause, SetSelectedEventType } from '../actions/espn-fastcast.actions';
import { EspnFastcastSelectors } from '../selectors/espn-fastcast.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastFacade {
  paused$ = select(EspnFastcastSelectors.getPaused);
  connected$ = select(EspnFastcastSelectors.getConnected);
  eventType$ = select(EspnFastcastSelectors.getEventType);
  lastDisconnect$ = select(EspnFastcastSelectors.getLastDisconnect);
  lastRefresh$ = select(EspnFastcastSelectors.getLastRefresh);
  isFeedValid$ = select(EspnFastcastSelectors.getIsFeedValid);
  feedLoadingValue$ = select(EspnFastcastSelectors.getFeedLoadingValue);
  showFeed$ = select(EspnFastcastSelectors.getShowFeed);

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

  setPauseState(): Observable<void> {
    return this.store.dispatch(new SetFastcastPause());
  }
}
