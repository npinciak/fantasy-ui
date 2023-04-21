import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FastCastConnection } from '../actions/espn-fastcast-connection.actions';
import { EspnFastcastConnectionSelectors } from '../selectors/espn-fastcast-connection.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastConnectionFacade {
  paused$ = select(EspnFastcastConnectionSelectors.slices.pause);
  connected$ = select(EspnFastcastConnectionSelectors.slices.connect);
  eventType$ = select(EspnFastcastConnectionSelectors.slices.eventType);
  lastDisconnect$ = select(EspnFastcastConnectionSelectors.slices.disconnect);
  lastRefresh$ = select(EspnFastcastConnectionSelectors.slices.lastRefresh);
  lastRefreshAsTickerDate$ = select(EspnFastcastConnectionSelectors.getLastRefreshAsTickerDate);
  showNoEventsMessage$ = select(EspnFastcastConnectionSelectors.showNoEventsMessage);
  selectedLeagueId$ = select(EspnFastcastConnectionSelectors.slices.league);

  constructor(private store: Store) {}

  fetchStaticFastcast(opts: {
    sport: string | null;
    league: string | null;
    weeks: number | null;
    seasontype: number | null;
  }): Observable<void> {
    return this.store.dispatch(new FastCastConnection.FetchStaticFastcast(opts));
  }

  connectWebSocket(): Observable<void> {
    return this.store.dispatch(new FastCastConnection.ConnectWebSocket());
  }

  disconnect(): Observable<void> {
    return this.store.dispatch(new FastCastConnection.DisconnectWebSocket());
  }

  setEventType(eventType: string | null): Observable<void> {
    return this.store.dispatch(new FastCastConnection.SetSelectedEventType({ eventType }));
  }

  setPauseState(): Observable<void> {
    return this.store.dispatch(new FastCastConnection.SetFastcastPause());
  }

  setSelectedLeague(leagueSlug: string) {
    this.store.dispatch(new FastCastConnection.SetSelectedLeague({ leagueSlug }));
  }

  setSelectedDate(date: string) {
    this.store.dispatch(new FastCastConnection.SetSelectedDate({ date }));
  }
}
