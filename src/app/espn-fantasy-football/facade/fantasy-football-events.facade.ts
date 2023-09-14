import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { FantasyFootballEvents } from '../actions/fantasy-football-events.actions';
import { FantasyFootballEventsSelectors } from '../selectors/fantasy-football-events.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballEventsFacade extends GenericFacade({
  selectorClass: FantasyFootballEventsSelectors,
  actionHandler: FantasyFootballEvents,
}) {}
