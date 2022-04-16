import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FetchBaseballPlayerNews } from '../state/fantasy-baseball-player.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballPlayerFacade {
  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  getPlayerNews(playerId: string, lookbackDays = '7'): Observable<void> {
    return this.store.dispatch(new FetchBaseballPlayerNews({ playerId, lookbackDays }));
  }
}
