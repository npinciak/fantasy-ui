import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { EspnFastcastEventSelectors } from '../selectors/espn-fastcast-event.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastEventFacade {
  eventsByLeagueId$ = select(EspnFastcastEventSelectors.getFastcastEventsByLeagueId);
}
