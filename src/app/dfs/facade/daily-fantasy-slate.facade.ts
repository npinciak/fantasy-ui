import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FetchSlates } from '../actions/daily-fantasy-slates.actions';
import { DailyFantasySlateSelectors, SlateTypeMap } from '../selectors/daily-fantasy-slate.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateFacade {
  @Select(DailyFantasySlateSelectors.getSlatesEmpty) slatesEmpty$: boolean;
  @Select(DailyFantasySlateSelectors.getSlateByType) selectSlateByType$: SlateTypeMap;

  constructor(private store: Store) {}

  fetchSlates(sport: string, site: string): void {
    this.store.dispatch(new FetchSlates({ sport, site }));
  }
}
