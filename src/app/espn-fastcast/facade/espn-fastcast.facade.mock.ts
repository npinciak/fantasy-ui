import { Observable, of } from 'rxjs';
import { FastcastEvent } from '../models/fastcast-event.model';
import { MOCK_FASTCAST_EVENT_1 } from '../models/fastcast-event.model.mock';
import { EspnFastcastFacade } from './espn-fastcast.facade';

export type Mock<T> = { [key in keyof T]: T[key] };

export class EspnFastcastFacadeMock implements Mock<EspnFastcastFacade> {
  eventType$: Observable<string>;
  feedLoadingValue$: Observable<number>;
  isFeedValid$: Observable<boolean>;
  getConnected$: Observable<number | null>;
  getEventType$: Observable<string | null>;
  lastDisconnect$: Observable<number | null>;
  lastRefresh$: Observable<number | null>;
  isFeedValid: Observable<boolean>;
  setEventType(eventType: string | null): Observable<void> {
    throw new Error('Method not implemented.');
  }
  connected$: Observable<number>;
  selectEventsMapList$: Observable<FastcastEvent[]> = of([MOCK_FASTCAST_EVENT_1]);
  selectLastRefresh$: Observable<number>;
  selectLastDisconnect$: Observable<number>;

  connect(): Observable<void> {
    return of();
  }

  disconnect(): Observable<void> {
    return of();
  }
}
