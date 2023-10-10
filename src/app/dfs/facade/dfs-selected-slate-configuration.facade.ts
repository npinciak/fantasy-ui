import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSelectedSlateConfigurationActions } from '../actions/dfs-selected-slate-configuration.actions';
import { DfsSelectedSlateConfigurationSelectors } from '../selectors/dfs-selected-slate-configuration.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsSelectedSlateConfigurationFacade {
  slateId$ = select(DfsSelectedSlateConfigurationSelectors.slices.slateId);
  site$ = select(DfsSelectedSlateConfigurationSelectors.slices.site);
  path$ = select(DfsSelectedSlateConfigurationSelectors.slices.path);
  sport$ = select(DfsSelectedSlateConfigurationSelectors.slices.sport);

  constructor(private store: Store) {}

  get slateId() {
    return this.store.selectSnapshot(DfsSelectedSlateConfigurationSelectors.slices.slateId);
  }

  get site() {
    return this.store.selectSnapshot(DfsSelectedSlateConfigurationSelectors.slices.site);
  }

  get path() {
    return this.store.selectSnapshot(DfsSelectedSlateConfigurationSelectors.slices.path);
  }

  get sport() {
    return this.store.selectSnapshot(DfsSelectedSlateConfigurationSelectors.slices.sport);
  }

  setSlateId(slateId: string): Observable<void> {
    return this.store.dispatch(new DfsSelectedSlateConfigurationActions.SetSlateId({ slateId }));
  }

  setSite(site: string): Observable<void> {
    return this.store.dispatch(new DfsSelectedSlateConfigurationActions.SetSite({ site }));
  }

  setPath(path: string): Observable<void> {
    return this.store.dispatch(new DfsSelectedSlateConfigurationActions.SetPath({ path }));
  }

  setSport(sport: string): Observable<void> {
    return this.store.dispatch(new DfsSelectedSlateConfigurationActions.SetSport({ sport }));
  }
}
