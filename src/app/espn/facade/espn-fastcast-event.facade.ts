import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastEventSelectors } from '../selectors/espn-fastcast-event.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastEventFacade {
  constructor(private store: Store) {}

  fastcastEventsByLeagueId(id: string): FastcastEvent[] {
    return this.store.selectSnapshot(EspnFastcastEventSelectors.selectFastcastEventsByLeagueId)(id);
  }
}
