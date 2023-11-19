import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { FantasyBaseballEventsSelector } from '../selectors/fantasy-baseball-events.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballEventsFacade extends GenericFacade({
  selectorClass: FantasyBaseballEventsSelector,
  actionHandler: FantasyBaseballEvents,
}) {}
