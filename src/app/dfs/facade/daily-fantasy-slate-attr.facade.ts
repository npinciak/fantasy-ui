import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DailyFantasySlateAttrSelectors, TeamList } from '../selectors/daily-fantasy-slate-attr.selectors';
import { FetchSlateAttr } from '../state/daily-fantasy-slate-attr.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateAttrFacade {
  @Select(DailyFantasySlateAttrSelectors.selectTeamList) selectTeamList$: Observable<TeamList[]>;

  constructor(private store: Store) {}

  selectTeamList(): TeamList[] {
    return this.store.selectSnapshot(DailyFantasySlateAttrSelectors.selectTeamList);
  }

  fetchSlateAttr(sport: string, site: string, slateId: string): Observable<void> {
    return this.store.dispatch(new FetchSlateAttr({ sport, site, slate: slateId }));
  }
}
