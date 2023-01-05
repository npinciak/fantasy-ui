import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSlateAttributes } from '../actions/dfs-slate-attr.actions';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateAttrFacade {
  constructor(private store: Store) {}

  fetchSlateAttr(slate: string): Observable<void> {
    return this.store.dispatch(new DfsSlateAttributes.Fetch({ slate }));
  }
}
