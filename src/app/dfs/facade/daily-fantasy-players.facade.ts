import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchPlayers } from '../actions/daily-fantasy-players.actions';
import { DailyFantasyPlayersSelectors } from '../selectors/daily-fantasy-players.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyPlayersFacade {
  playersEmpty$ = select(DailyFantasyPlayersSelectors.getSlatesEmpty);
  constructor(private store: Store) {}

  fetchPlayers(slatePath: string): Observable<void> {
    return this.store.dispatch(new FetchPlayers({ slatePath }));
  }
}
