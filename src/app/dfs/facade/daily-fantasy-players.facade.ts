import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchPlayers } from '../actions/daily-fantasy-players.actions';
import { PlayerTableData } from '../models/player.model';
import { DailyFantasyPlayersSelectors } from '../selectors/daily-fantasy-players.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyPlayersFacade {
  @Select(DailyFantasyPlayersSelectors.selectPositionsList) positionList$: Observable<string[]>;
  @Select(DailyFantasyPlayersSelectors.selectTeamList) teamList$: Observable<string[]>;

  @Select(DailyFantasyPlayersSelectors.selectNbaPlayerTableRows) selectNbaPlayerTableRows$: Observable<PlayerTableData[]>;
  @Select(DailyFantasyPlayersSelectors.selectNflPlayerTableRows) selectNflPlayerTableRows$: Observable<unknown[]>;

  @Select(DailyFantasyPlayersSelectors.selectPlayersEmpty) playersEmpty$: Observable<boolean>;

  constructor(private store: Store) {}

  fetchPlayers(slatePath: string): Observable<void> {
    return this.store.dispatch(new FetchPlayers({ slatePath }));
  }
}
