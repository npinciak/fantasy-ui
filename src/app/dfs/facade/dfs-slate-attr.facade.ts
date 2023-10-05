import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSlateAttributes } from '../actions/dfs-slate-attr.actions';

@Injectable({
  providedIn: 'root',
})
export class DfsSlateAttrFacade {
  constructor(private store: Store) {}

  clear(): Observable<void> {
    return this.store.dispatch(new DfsSlateAttributes.Clear());
  }

  fetchSlateAttributesBySlateId(slateId: string): Observable<void> {
    return this.store.dispatch(new DfsSlateAttributes.Fetch({ slateId }));
  }
}
