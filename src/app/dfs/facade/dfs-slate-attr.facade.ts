import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSlateAttributesActions } from '../actions/dfs-slate-attr.actions';

@Injectable({
  providedIn: 'root',
})
export class DfsSlateAttrFacade {
  constructor(private store: Store) {}

  clear(): Observable<void> {
    return this.store.dispatch(new DfsSlateAttributesActions.Clear());
  }

  /**@deprecated use nfl/mlb slate sttributes */
  fetchSlateAttributesBySlateId(slateId: string): Observable<void> {
    return this.store.dispatch(new DfsSlateAttributesActions.Fetch({ slateId }));
  }
}
