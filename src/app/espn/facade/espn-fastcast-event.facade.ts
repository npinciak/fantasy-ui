import { Injectable } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastEventSelectors } from '../selectors/espn-fastcast-event.selectors';
import {
  DeselectFastcastEvent,
  EspnFastcastEventToggleState,
  SelectFastcastEvent,
  ToggleOffFastcastEvent,
  ToggleOnFastcastEvent,
} from '../state/espn-fastcast-event-toggle.state';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastEventFacade {
  @Select(EspnFastcastEventSelectors.selectFastcastEventsByLeagueId) eventsByLeagueId$: Observable<(id: string) => FastcastEvent[]>;
  @Select(EspnFastcastEventToggleState.isIdToggled) isEventToggled$: Observable<(id: string) => boolean>;

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

  toggleExpandedEvent(id: string): void {
    this.store.dispatch(new ToggleOnFastcastEvent({ ids: [id] }));
  }

  toggleOffExpandedEvent(id: string): void {
    this.store.dispatch(new ToggleOffFastcastEvent({ ids: [id] }));
  }

  selectExpandedEvent(id: string): void {
    this.store.dispatch(new SelectFastcastEvent({ ids: [id] }));
  }

  deselectExpandedEvent(id: string): void {
    this.store.dispatch(new DeselectFastcastEvent({ ids: [id] }));
  }

  /**
   *
   * @deprecated use EspnFastcastEventFacade.eventsByLeagueId$
   */
  fastcastEventsByLeagueId(id: string): FastcastEvent[] {
    return this.store.selectSnapshot(EspnFastcastEventSelectors.selectFastcastEventsByLeagueId)(id);
  }
}
