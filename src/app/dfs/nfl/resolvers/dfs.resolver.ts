import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UrlParams, UrlQueryParams } from '@app/@shared/urlBuilder';
import { SlateFacade } from '@app/dfs/mlb/facade/slate.facade';
import { FetchSlates } from '@app/dfs/mlb/state/dfs-slate.actions';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class NFLDfsResolver implements Resolve<void> {
  constructor(readonly slateFacade: SlateFacade, private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const site = route.queryParamMap.get(UrlQueryParams.Site) ?? 'draftkings';
    await Promise.all([this.slateFacade.fetchSlateConfigs().toPromise(), this.store.dispatch(new FetchSlates(site, 'nfl'))]);
  }
}
