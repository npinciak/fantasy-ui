import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchPlayers } from '../state/daily-fantasy-players.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyPlayersFacade {
  constructor(private store: Store) {}

  fetchPlayers(slatePath: string, league: string) {
    return this.store.dispatch(new FetchPlayers({ slatePath, league }));
  }
}
