import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSlatePlayers } from '../actions/dfs-players.actions';
import { DailyFantasyPlayersSelectors } from '../selectors/daily-fantasy-players.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsPlayersFacade {
  playersEmpty$ = select(DailyFantasyPlayersSelectors.getSlatesEmpty);
  constructor(private store: Store) {}

  fetchPlayers(slatePath: string): Observable<void> {
    return this.store.dispatch(new DfsSlatePlayers.Fetch({ slatePath }));
  }
}
