import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { DfsNflSlateDetailsActions } from '../actions/dfs-nfl-slate-details.actions';

@Injectable({ providedIn: 'root' })
export class DfsNflSlateDetailsFacade {
  constructor(private store: Store) {}

  fetch() {
    return this.store.dispatch(DfsNflSlateDetailsActions.Fetch);
  }
}
