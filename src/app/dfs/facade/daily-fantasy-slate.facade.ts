import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DailyFantasySlateSelectors, SlateTypeMap } from '../selectors/daily-fantasy-slate.selectors';
import { FetchSlateAttr } from '../state/daily-fantasy-slate-attr.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateFacade {
  @Select(DailyFantasySlateSelectors.slatesEmpty) slatesEmpty$: boolean;
  @Select(DailyFantasySlateSelectors.selectSlateByType) selectSlateByType$: SlateTypeMap;

  constructor(private store: Store) {}

  fetchSlateAttr(sport: string, site: string, slateId: string) {
    return this.store.dispatch(new FetchSlateAttr({ sport, site, slateId }));
  }
}
