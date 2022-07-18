import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FantasyMatchup } from '../models/fantasy-schedule.model';
import { FantasyFootballScheduleSelectors } from '../selectors/fantasy-football-schedule.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballScheduleFacade {
  @Select(FantasyFootballScheduleSelectors.selectMatchupListWithFantasyTeams) selectMatchupListWithFantasyTeams$: Observable<
    FantasyMatchup[]
  >;

  @Select(FantasyFootballScheduleSelectors.selectMatchupPeriodIds) selectMatchupPeriodIds$: Observable<number[]>;

  constructor(private store: Store) {}

  selectMatchupListWithFantasyTeamsByMatchupPeriodId(id: number) {
    return this.store.selectSnapshot(FantasyFootballScheduleSelectors.selectMatchupListByMatchupPeriodId)(id);
  }

  selectMatchupById(id: number) {
    return this.store.selectSnapshot(FantasyFootballScheduleSelectors.selectMatchupById)(id);
  }
}
