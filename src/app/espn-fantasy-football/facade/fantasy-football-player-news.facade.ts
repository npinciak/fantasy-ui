import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyFootballPlayerNews } from '../actions/fantasy-football-player-news.actions';
import { FantasyFootballPlayerNewsSelector } from '../selectors/fantasy-football-player-news.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballPlayerNewsFacade extends GenericFacade({
  selectorClass: FantasyFootballPlayerNewsSelector,
  actionHandler: FantasyFootballPlayerNews,
}) {
  getCurrentPlayerNews$ = select(FantasyFootballPlayerNewsSelector.getCurrentPlayerNews);

  constructor(private store: Store) {
    super();
  }

  getPlayerNews(playerId: string): Observable<void> {
    return this.store.dispatch(new FantasyFootballPlayerNews.Fetch({ playerId }));
  }
}
