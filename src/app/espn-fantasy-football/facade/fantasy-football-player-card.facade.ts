import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyFootballPlayerCard } from '../actions/fantasy-football-player-card.actions';
import { FantasyFootballPlayerCardSelector } from '../selectors/fantasy-football-player-card.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballPlayerCardFacade extends GenericFacade({
  selectorClass: FantasyFootballPlayerCardSelector,
  actionHandler: FantasyFootballPlayerCard,
}) {
  getCurrentPlayerCard$ = select(FantasyFootballPlayerCardSelector.getCurrentPlayerCard);
  getCurrentPlayerCardStats$ = select(FantasyFootballPlayerCardSelector.getCurrentPlayerCardStats);

  constructor(private store: Store) {
    super();
  }

  getPlayerCard(playerId: string): Observable<void> {
    return this.store.dispatch(new FantasyFootballPlayerCard.Fetch({ playerId }));
  }
}
