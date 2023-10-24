import { createPropertySelectors } from '@ngxs/store';
import { DfsSelectedSlateConfigurationStateModel } from '../models/dfs-selected-slate-configuration.model';
import { DfsSelectedSlateConfigurationState } from '../state/dfs-selected-slate-configuration.state';

export class DfsSelectedSlateConfigurationSelectors {
  static slices = createPropertySelectors<DfsSelectedSlateConfigurationStateModel>(DfsSelectedSlateConfigurationState);
}
