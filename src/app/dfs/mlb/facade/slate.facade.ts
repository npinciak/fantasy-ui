import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSlate } from '../models/slateMaster.interface';
import { SlateSelectors, SlateType } from '../selectors/slate.selector';
import { FetchSlateConfigs } from '../state/mlb-dfs.actions';

@Injectable({
  providedIn: 'root',
})
export class SlateFacade {
  // @Select(SlateSelectors.getSlates) public slates$: Observable<DfsSlate[]>;
  @Select(SlateSelectors.getSlatesByClassic) public slatesByClassic$: Observable<DfsSlate[]>;
  @Select(SlateSelectors.slatesEmpty) public slatesEmpty$: Observable<boolean>;

  constructor(private store: Store) {}

  // selectSlatesBySite = (site: DfsSite): DfsSlate[] => this.store.selectSnapshot(SlateSelectors.selectSlatesBySiteArr)(site);

  selectSlateByType = (): { [slateType in SlateType]: DfsSlate[] } => this.store.selectSnapshot(SlateSelectors.selectSlateByType);

  fetchSlateConfigs = () => this.store.dispatch(new FetchSlateConfigs());
}
