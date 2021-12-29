import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { FetchFootballLeague } from '../actions/nfl.actions';
import { FantasyFootballScheduleSelectors } from '../selectors/fantasy-football-schedule.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballScheduleFacade {
  constructor(private store: Store) {}

  selectMatchupById(id: number) {
    return this.store.selectSnapshot(FantasyFootballScheduleSelectors.selectMatchupById)(id);
  }

  getLeague(leagueId: string) {
    return this.store.dispatch(new FetchFootballLeague(leagueId));
  }
}
