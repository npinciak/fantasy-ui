import { Selector, createPropertySelectors } from '@ngxs/store';
import { DfsEndpointBuilder } from '../endpoint-builder/dfs-endpoint-builder';
import { DfsSelectedSlateConfigurationStateModel } from '../models/dfs-selected-slate-configuration.model';
import { DfsSelectedSlateConfigurationState } from '../state/dfs-selected-slate-configuration.state';

export class DfsSelectedSlateConfigurationSelectors {
  static slices = createPropertySelectors<DfsSelectedSlateConfigurationStateModel>(DfsSelectedSlateConfigurationState);

  @Selector([DfsSelectedSlateConfigurationSelectors.slices.slateId])
  static getSelectedSlateLineupTemplateCsv(slateId: string | null): string | null {
    if (!slateId) return null;
    return new DfsEndpointBuilder().dkBulkLineupUrl(slateId);
  }
}
