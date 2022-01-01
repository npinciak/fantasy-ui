import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastLeagueFacade {
  @Select(EspnFastcastLeagueSelectors.selectPrettyLeagueList) prettyLeagueList$: Observable<any[]>;

  constructor(private store: Store) {}

  fastcastEventsByLeagueId(id: string): FastcastEvent[] {
    return this.store.selectSnapshot(EspnFastcastLeagueSelectors.selectFastcastEventsByLeagueId)(id);
  }
}
