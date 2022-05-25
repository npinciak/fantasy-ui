import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FetchBaseballPlayerNews } from '../state/fantasy-baseball-player.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballPlayerFacade {
  isLoading$ = select(FantasyBaseballLeagueState.isLoading);

  constructor(private store: Store) {}

  getPlayerNews(playerId: string, lookbackDays = '7'): Observable<void> {
    return this.store.dispatch(new FetchBaseballPlayerNews({ playerId, lookbackDays }));
  }
}
