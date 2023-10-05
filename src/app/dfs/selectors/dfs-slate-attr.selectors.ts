import { createPropertySelectors } from '@ngxs/store';
import { DfsSlateAttributesStateModel } from '../models/dfs-slate-attr.model';
import { DfsSlateAttributesState } from '../state/dfs-slate-attr.state';

export class DfsSlateAttrSelectors {
  static slices = createPropertySelectors<DfsSlateAttributesStateModel>(DfsSlateAttributesState);
}
