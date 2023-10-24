import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UrlQueryParams } from '@app/@core/router/url-builder';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { firstValueFrom } from 'rxjs';
import { DfsSelectedSlateConfigurationFacade } from '../facade/dfs-selected-slate-configuration.facade';
import { DfsSlatePlayersFacade } from '../facade/dfs-slate-players.facade';
import { DfsSlatesFacade } from '../facade/dfs-slates.facade';

@Injectable({
  providedIn: 'root',
})
export class DfsResolver implements Resolve<void> {
  constructor(
    private dfsSlatesFacade: DfsSlatesFacade,
    private dfsSlatePlayersFacade: DfsSlatePlayersFacade,
    private dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const site = route.queryParamMap.get(UrlQueryParams.Site);
    const sport = route.routeConfig?.path;

    if (!exists(site) || !exists(sport)) throw new Error('Site or Sport is not defined');

    await firstValueFrom(this.dfsSelectedSlateConfigurationFacade.setSport(sport));
    await firstValueFrom(this.dfsSelectedSlateConfigurationFacade.setSite(site));
    await firstValueFrom(this.dfsSlatesFacade.fetchSlates(site, sport));

    const slatePath = this.dfsSelectedSlateConfigurationFacade.path;
    const slateId = this.dfsSelectedSlateConfigurationFacade.slateId;

    if (!exists(slateId) || !exists(slatePath)) throw new Error(`slateId (${slateId}) or slatePath (${slateId}) is not defined`);

    await firstValueFrom(this.dfsSlatePlayersFacade.fetchPlayers(slatePath));
  }
}
