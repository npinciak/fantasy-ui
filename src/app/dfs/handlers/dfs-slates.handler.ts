import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext } from '@ngxs/store';
import { ClientSiteSlateEntity } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { SLATE_TYPES } from '@sports-ui/daily-fantasy-sdk/models';
import { firstValueFrom } from 'rxjs';
import { DfsSlatesActions } from '../actions/dfs-slates.actions';
import { DfsSelectedSlateConfigurationFacade } from '../facade/dfs-selected-slate-configuration.facade';
import { DfsSlatesFacade } from '../facade/dfs-slates.facade';
import { SlateService } from '../service/slate.service';

@State({ name: DfsSlatesActions.stateName + 'ActionHandler' })
@Injectable()
export class DfsSlatesHandlerState {
  constructor(
    private dfsSlatesFacade: DfsSlatesFacade,
    private dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    private slateService: SlateService
  ) {}

  @Action(DfsSlatesActions.Fetch)
  async fetchSlates(
    _: StateContext<GenericStateModel<ClientSiteSlateEntity>>,
    { payload }: { payload: { sport: string; site: string } }
  ): Promise<void> {
    const { sport, site } = payload;

    const map = await firstValueFrom(this.slateService.getSlatesByDate({ sport }));

    const slates = Object.values(map[site]) as ClientSiteSlateEntity[];

    await firstValueFrom(this.dfsSlatesFacade.addOrUpdate(slates));

    if (slates.length <= 0) return;

    const filteredClassicSlates = slates.filter(s => s.type === SLATE_TYPES.Classic);
    const filteredShowdownSlates = slates.filter(s => s.type === SLATE_TYPES.Showdown);

    const filteredClassicSlatesExist = filteredClassicSlates.length > 0;
    const slateId = filteredClassicSlatesExist ? filteredClassicSlates[0].importId : filteredShowdownSlates[0].importId;
    const slatePath = filteredClassicSlatesExist ? filteredClassicSlates[0].slate_path : filteredShowdownSlates[0].slate_path;

    await Promise.all([
      firstValueFrom(this.dfsSelectedSlateConfigurationFacade.setPath(slatePath)),
      firstValueFrom(this.dfsSelectedSlateConfigurationFacade.setSlateId(slateId)),
    ]);
  }
}
