import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyBaseballPlayerCard } from '../actions/fantasy-baseball-player-card.actions';
import { FantasyBaseballPlayerCardSelector } from '../selectors/fantasy-baseball-player-card.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballPlayerCardFacade extends GenericFacade({
  selectorClass: FantasyBaseballPlayerCardSelector,
  actionHandler: FantasyBaseballPlayerCard,
}) {
  getCurrentPlayerCard$ = select(FantasyBaseballPlayerCardSelector.getCurrentPlayerCard);
  getCurrentPlayerCardStats$ = select(FantasyBaseballPlayerCardSelector.getCurrentPlayerCardStats);

  constructor(private store: Store) {
    super();
  }

  getPlayerCard(playerId: string): Observable<void> {
    return this.store.dispatch(new FantasyBaseballPlayerCard.Fetch({ playerId }));
  }
}
