import { createPropertySelectors } from '@ngxs/store';
import { DfsFilterStateModel } from '../models/dfs-filter.model';
import { DfsFilterState } from '../state/dfs-filter.state';

export class DfsFilterSelector {
  static slices = createPropertySelectors<DfsFilterStateModel>(DfsFilterState);
}
