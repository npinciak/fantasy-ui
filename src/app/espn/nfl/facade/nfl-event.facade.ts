import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NflEvent } from '../models/nfl-event.model';
import { NflEventSelectors } from '../selectors/nfl-event.selectors';

@Injectable({
  providedIn: 'root',
})
export class NflEventFacade {
  @Select(NflEventSelectors.selectEventList) public selectEventList$: Observable<NflEvent[]>;

  constructor() {}
}
