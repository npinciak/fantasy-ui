import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastLeagueFacade {
  @Select(EspnFastcastLeagueSelectors.selectPrettyLeagueList) prettyLeagueList$: Observable<any[]>;

  constructor(private store: Store) {}


}
