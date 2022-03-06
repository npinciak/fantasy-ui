import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DailyFantasySlateSelectors, SlateTypeMap } from '../selectors/daily-fantasy-slate.selectors';
import { FetchSlates } from '../state/daily-fantasy-slate.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateFacade {
  @Select(DailyFantasySlateSelectors.slatesEmpty) slatesEmpty$: boolean;
  @Select(DailyFantasySlateSelectors.selectSlateByType) selectSlateByType$: SlateTypeMap;

  constructor(private store: Store) {}

  fetchSlates(sport: string, site: string): void {
    this.store.dispatch(new FetchSlates({ sport, site }));
  }
}
