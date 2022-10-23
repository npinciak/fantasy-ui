import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeselectFastcastEvent,
  SelectFastcastEvent,
  ToggleOffFastcastEvent,
  ToggleOnFastcastEvent,
} from '../actions/espn-fastcast-event-toggle.actions';
import { EspnFastcastEventToggleSelectors } from '../selectors/espn-fastcast-event-toggle.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastEventToggleFacade {
  isIdToggled$ = select(EspnFastcastEventToggleSelectors.isIdToggled);

  constructor(private store: Store) {}

  toggleExpandedEvent(id: string): Observable<void> {
    return this.store.dispatch(new ToggleOnFastcastEvent({ ids: [id] }));
  }

  toggleOffExpandedEvent(id: string): Observable<void> {
    return this.store.dispatch(new ToggleOffFastcastEvent({ ids: [id] }));
  }

  selectExpandedEvent(id: string): Observable<void> {
    return this.store.dispatch(new SelectFastcastEvent({ ids: [id] }));
  }

  deselectExpandedEvent(id: string): Observable<void> {
    return this.store.dispatch(new DeselectFastcastEvent({ ids: [id] }));
  }
}
