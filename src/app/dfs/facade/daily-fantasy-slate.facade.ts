import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchSlates } from '../actions/daily-fantasy-slates.actions';
import { DailyFantasySlateSelectors, SlateTypeMap } from '../selectors/daily-fantasy-slate.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateFacade {
  @Select(DailyFantasySlateSelectors.getSlatesEmpty) slatesEmpty$: boolean;
  @Select(DailyFantasySlateSelectors.getSlateByType) selectSlateByType$: SlateTypeMap;

  constructor(private store: Store) {}

  fetchSlates(sport: string, site: string): Observable<void> {
    return this.store.dispatch(new FetchSlates({ sport, site }));
  }
}
