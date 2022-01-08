import { Injectable } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';

import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastEventSelectors } from '../selectors/espn-fastcast-event.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastEventFacade {
  fastcastFilteredEvents$ = new Subject<FastcastEvent[]>();

  constructor(private store: Store) {}

  fastcastLeagueChange(event: MatSelectChange): void {
    const events = this.fastcastEventsByLeagueId(event.value);
    return this.fastcastFilteredEvents$.next(events);
  }

  fastcastEventsByLeagueId(id: string): FastcastEvent[] {
    return this.store.selectSnapshot(EspnFastcastEventSelectors.selectFastcastEventsByLeagueId)(id);
  }
}
