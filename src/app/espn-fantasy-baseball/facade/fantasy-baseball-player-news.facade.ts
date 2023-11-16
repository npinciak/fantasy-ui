import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyBaseballPlayerNews } from '../actions/fantasy-baseball-player-news.actions';
import { FantasyBaseballPlayerNewsSelector } from '../selectors/fantasy-baseball-player-news.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballPlayerNewsFacade extends GenericFacade({
  selectorClass: FantasyBaseballPlayerNewsSelector,
  actionHandler: FantasyBaseballPlayerNews,
}) {
  currentPlayerNews$ = select(FantasyBaseballPlayerNewsSelector.getCurrentPlayerNews);

  constructor(private store: Store) {
    super();
  }

  getPlayerNews(playerId: string): Observable<void> {
    return this.store.dispatch(new FantasyBaseballPlayerNews.Fetch({ playerId }));
  }
}
