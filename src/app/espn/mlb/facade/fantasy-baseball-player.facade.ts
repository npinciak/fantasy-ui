import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyBaseballPlayerNews } from '../actions/fantasy-baseball-player-news.actions';
import { FantasyBaseballPlayerSelector } from '../selectors/fantasy-baseball-player.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballPlayerFacade extends GenericFacade(FantasyBaseballPlayerSelector) {
  constructor(private store: Store) {
    super();
  }

  getPlayerNews(playerId: string): Observable<void> {
    return this.store.dispatch(new FantasyBaseballPlayerNews.Fetch({ playerId }));
  }
}
