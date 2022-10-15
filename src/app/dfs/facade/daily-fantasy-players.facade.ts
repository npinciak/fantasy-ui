import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchPlayers } from '../actions/daily-fantasy-players.actions';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyPlayersFacade {
  constructor(private store: Store) {}

  fetchPlayers(slatePath: string): Observable<void> {
    return this.store.dispatch(new FetchPlayers({ slatePath }));
  }
}
