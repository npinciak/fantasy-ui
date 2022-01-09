import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { DfsSlate, SlateMaster } from '../models/slateMaster.interface';
import { SiteSlateConfig } from '../models/slateSettings.interface';
import { DfsService } from '../../service/dfs.service';
import { SlateService } from '../../service/slate.service';
import { DfsSlateAction, FetchResources, FetchSlates } from './dfs-slate.actions';
import { FetchSlateConfigs } from './mlb-dfs.actions';

export class DfsSlateStateModel {
  slateConfigs: SiteSlateConfig;
  slates!: { [id: number]: DfsSlate };
}

const defaults = {
  slateConfigs: null,
  slates: {},
};

@State<DfsSlateStateModel>({
  name: 'dfsSlate',
  defaults,
})
@Injectable()
export class DfsSlateState {
  constructor(private slateService: SlateService) {}

  @Selector()
  static slates(state: DfsSlateStateModel): { [id: number]: DfsSlate } {
    return state.slates;
  }

  @Selector()
  static slateConfigs(state: DfsSlateStateModel): SiteSlateConfig {
    return state.slateConfigs;
  }

  @Action(FetchSlateConfigs)
  async fetchSlateConfigs(ctx: StateContext<DfsSlateStateModel>): Promise<void> {
    try {
      const slateConfigs = await this.slateService.slateConfigurations().toPromise();


      ctx.patchState({ slateConfigs});
    } catch (error) {}
  }

  @Action(FetchSlates)
  async fetchSlates(ctx: StateContext<DfsSlateStateModel>, { site, sport }: FetchSlates): Promise<void> {
    try {
      const res = await this.slateService.slatesByDate(sport).toPromise();

      const slates = res[site];

      ctx.patchState({ slates });
    } catch (error) {}
  }
}
