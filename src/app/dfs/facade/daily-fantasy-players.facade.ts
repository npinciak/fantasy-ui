import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlayerTableRow } from '../models/player.model';
import { DailyFantasyPlayersSelectors } from '../selectors/daily-fantasy-players.selectors';
import { FetchPlayers } from '../state/daily-fantasy-players.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyPlayersFacade {
  @Select(DailyFantasyPlayersSelectors.selectPositionsList) positionList$: Observable<string[]>;

  @Select(DailyFantasyPlayersSelectors.selectPlayerTableRows) playerTableRows$: Observable<PlayerTableRow[]>;
  @Select(DailyFantasyPlayersSelectors.selectPlayersEmpty) playersEmpty$: Observable<boolean>;

  constructor(private store: Store) {}

  fetchPlayers(slatePath: string, league: string) {
    return this.store.dispatch(new FetchPlayers({ slatePath, league }));
  }
}
