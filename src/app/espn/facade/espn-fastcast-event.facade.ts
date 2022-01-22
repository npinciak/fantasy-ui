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
  fastcastFilteredEventsSidebar$ = new Subject<FastcastEvent[]>();
  fastcastFilteredEventsLeaderboard$ = new Subject<FastcastEvent[]>();

  constructor(private store: Store) {}

  fastcastLeagueChangeSidebar(event: MatSelectChange): void {
    const events = this.fastcastEventsByLeagueId(event.value);
    return this.fastcastFilteredEventsSidebar$.next(events);
  }

  fastcastLeagueChangeLeaderboard(event: MatSelectChange): void {
    const events = this.fastcastEventsByLeagueId(event.value);
    return this.fastcastFilteredEventsLeaderboard$.next(events);
  }

  fastcastEventsByLeagueId(id: string): FastcastEvent[] {
    return this.store.selectSnapshot(EspnFastcastEventSelectors.selectFastcastEventsByLeagueId)(id);
  }
}
