import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DisconnectWebSocket } from '../actions/espn-fastcast.actions';
import { EspnFastcastSelectors } from '../selectors/espn-fastcast.selectors';
import { EspnFastcastState, LeagueEventList, SportMapModel } from '../state/espn-fastcast.state';
@Injectable({
  providedIn: 'root',
})
export class EspnFastcastFacade {
  @Select(EspnFastcastSelectors.selectSportMapOptions) selectSportMapOptions$: Observable<SportMapModel[]>;
  @Select(EspnFastcastSelectors.selectLeagueListBySlug) selectLeagueListBySlug$: Observable<LeagueEventList[]>;

  @Select(EspnFastcastState.selectLastRefresh) selectLastRefresh$: Observable<number>;

  constructor(private store: Store) {}

  selectLeagueListBySlug(sport: string) {
    return this.store.selectSnapshot(EspnFastcastSelectors.selectLeagueListBySlug)(sport);
  }

  disconnect() {
    return this.store.dispatch(new DisconnectWebSocket());
  }
}
