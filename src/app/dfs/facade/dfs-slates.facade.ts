import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSlatesActions } from '../actions/dfs-slates.actions';
import { DailyFantasySlateSelectors } from '../selectors/daily-fantasy-slate.selectors';
import { DfsSlatesSelectors } from '../selectors/dfs-slates.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsSlatesFacade extends GenericFacade({ selectorClass: DfsSlatesSelectors, actionHandler: DfsSlatesActions }) {
  slatesEmpty$ = select(DailyFantasySlateSelectors.getSlatesEmpty);
  selectSlateByType$ = select(DailyFantasySlateSelectors.getSlateByType);

  slateWeather$ = select(DailyFantasySlateSelectors.getSlateGameWeather);

  constructor(private store: Store) {
    super();
  }

  fetchSlates(site: string, sport: string): Observable<void> {
    return this.store.dispatch(new DfsSlatesActions.Fetch({ site, sport }));
  }
}
