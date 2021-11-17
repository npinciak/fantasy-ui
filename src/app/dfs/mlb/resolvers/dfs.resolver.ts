import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UrlParams, UrlQueryParams } from '@app/@shared/url-builder';
import { Store } from '@ngxs/store';
import { SlateFacade } from '../facade/slate.facade';
import { FetchSlates } from '../state/dfs-slate.actions';

@Injectable({
  providedIn: 'root',
})
export class MLBDfsResolver implements Resolve<void> {
  constructor(readonly slateFacade: SlateFacade, private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const site = route.queryParamMap.get(UrlQueryParams.Site) ?? 'draftkings';
    await Promise.all([this.slateFacade.fetchSlateConfigs().toPromise(), this.store.dispatch(new FetchSlates(site, 'mlb'))]);
  }
}
