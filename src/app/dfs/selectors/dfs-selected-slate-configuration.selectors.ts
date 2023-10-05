import { createPropertySelectors } from '@ngxs/store';
import {
  DfsSelectedSlateConfigurationState,
  DfsSelectedSlateConfigurationStateModel,
} from '../state/dfs-selected-slate-configuration.state';

export class DfsSelectedSlateConfigurationSelectors {
  static slices = createPropertySelectors<DfsSelectedSlateConfigurationStateModel>(DfsSelectedSlateConfigurationState);
}
