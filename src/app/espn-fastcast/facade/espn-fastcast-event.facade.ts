import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FastcastEvents } from '../actions/espn-fastcast-event.actions';
import { EspnFastcastEventSelectors } from '../selectors/espn-fastcast-event.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastEventFacade extends GenericFacade({
  selectorClass: EspnFastcastEventSelectors,
  actionHandler: FastcastEvents,
}) {
  eventsByLeagueId$ = select(EspnFastcastEventSelectors.getFastcastEventsByLeagueId);
}
