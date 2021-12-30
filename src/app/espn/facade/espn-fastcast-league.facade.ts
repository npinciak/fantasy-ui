import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastLeagueFacade {
  constructor(private store: Store) {}

  fastcastEventsByLeagueId(id: string): FastcastEvent[] {
    return this.store.selectSnapshot(EspnFastcastLeagueSelectors.selectFastcastEventsByLeagueId)(id);
  }
}
