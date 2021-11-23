import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MlbEvent } from '../models/mlb-event.model';
import { MlbEventSelectors } from '../selectors/mlb-event.selectors';

@Injectable({
  providedIn: 'root',
})
export class MlbEventFacade {
  @Select(MlbEventSelectors.selectEventList) public selectEventList$: Observable<MlbEvent[]>;

  constructor() {}
}
