import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ShellFacade } from '@app/@core/shell/facade/shell.facade';
import { exists } from '@app/@shared/helpers/utils';
import { UrlQueryParams } from '@app/@shared/url-builder';
import { Store } from '@ngxs/store';
import { FetchSlates } from '../state/daily-fantasy-slate.state';

@Injectable({
  providedIn: 'root',
})
export class DfsResolver implements Resolve<void> {
  constructor(readonly shellFacade: ShellFacade, private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const site = route.queryParamMap.get(UrlQueryParams.Site);
    const sport = route.queryParamMap.get(UrlQueryParams.Sport);

    if (exists(site) && exists(sport)) await Promise.all([this.store.dispatch(new FetchSlates({ site, sport }))]);

    await this.shellFacade.showFastcastScoreboard(true);
  }
}
