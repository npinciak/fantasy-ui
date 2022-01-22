import { Observable, of } from 'rxjs';
import { FastcastEvent } from '../models/fastcast-event.model';
import { MOCK_FASTCAST_EVENT_1 } from '../models/fastcast-event.model.mock';
import { EspnFastcastFacade } from './espn-fastcast.facade';

export type Mock<T> = { [key in keyof T]: T[key] };

export class EspnFastcastFacadeMock implements Mock<EspnFastcastFacade> {
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
