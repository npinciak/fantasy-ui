import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { FantasyFootballPlayerCard } from '../actions/fantasy-football-player-card.actions';
import { FantasyFootballPlayerCardSelector } from '../selectors/fantasy-football-player-card.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballPlayerCardFacade extends GenericFacade({
  selectorClass: FantasyFootballPlayerCardSelector,
  actionHandler: FantasyFootballPlayerCard,
}) {}
