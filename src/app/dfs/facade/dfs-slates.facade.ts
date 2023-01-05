import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { DfsSlates } from '../actions/dfs-slates.actions';
import { DailyFantasySlateSelectors } from '../selectors/daily-fantasy-slate.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsSlatesFacade {
  slatesEmpty$ = select(DailyFantasySlateSelectors.getSlatesEmpty);
  selectSlateByType$ = select(DailyFantasySlateSelectors.getSlateByType);

  constructor(private store: Store) {}

  fetchSlates(site: string, sport: string): void {
    this.store.dispatch(new DfsSlates.Fetch({ site, sport }));
  }
}
