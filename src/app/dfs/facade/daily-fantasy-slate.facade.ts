import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { FetchSlates } from '../actions/daily-fantasy-slates.actions';
import { DailyFantasySlateSelectors } from '../selectors/daily-fantasy-slate.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateFacade {
  slatesEmpty$ = select(DailyFantasySlateSelectors.getSlatesEmpty);
  selectSlateByType$ = select(DailyFantasySlateSelectors.getSlateByType);

  constructor(private store: Store) {}

  fetchSlates(site: string, sport: string): void {
    this.store.dispatch(new FetchSlates({ site, sport }));
  }
}
