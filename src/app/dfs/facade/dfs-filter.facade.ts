import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { DfsFilterActions } from '../actions/dfs-filter.actions';
import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';
import { DfsFilterSelector } from '../selectors/dfs-filter.selector';

@Injectable({
  providedIn: 'root',
})
export class DfsFilterFacade {
  name$ = select(DfsFilterSelector.slices.name);
  team$ = select(DfsFilterSelector.slices.team);
  position$ = select(DfsFilterSelector.slices.position);
  projectionType$ = select(DfsFilterSelector.slices.projectionType);

  constructor(private store: Store) {}

  get name() {
    return this.store.selectSnapshot(DfsFilterSelector.slices.name);
  }

  get team() {
    return this.store.selectSnapshot(DfsFilterSelector.slices.team);
  }

  get position() {
    return this.store.selectSnapshot(DfsFilterSelector.slices.position);
  }

  get projectionType() {
    return this.store.selectSnapshot(DfsFilterSelector.slices.projectionType);
  }

  setName(name: string | null): Observable<void> {
    return this.store.dispatch(new DfsFilterActions.SetName({ name }));
  }

  setTeam(team: string | null): Observable<void> {
    return this.store.dispatch(new DfsFilterActions.SetTeam({ team }));
  }

  setPosition(position: string | null): Observable<void> {
    return this.store.dispatch(new DfsFilterActions.SetPosition({ position }));
  }

  setProjectionType(projectionType: GridIronProjectionType): Observable<void> {
    return this.store.dispatch(new DfsFilterActions.SetProjectionType({ projectionType }));
  }
}
