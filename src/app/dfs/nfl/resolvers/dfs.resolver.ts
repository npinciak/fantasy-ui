import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UrlParams, UrlQueryParams } from '@app/@shared/url-builder';
import { SlateFacade } from '@app/dfs/mlb/facade/slate.facade';
import { FetchSlates } from '@app/dfs/state/daily-fantasy-slate.state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class NFLDfsResolver implements Resolve<void> {
  constructor(readonly slateFacade: SlateFacade, private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const site = route.queryParamMap.get(UrlQueryParams.Site) ?? 'draftkings';
    const sport = route.queryParamMap.get(UrlQueryParams.Sport) ?? 'nfl';

    await Promise.all([this.store.dispatch(new FetchSlates({ site, sport })), this.slateFacade.fetchSlateConfigs().toPromise()]);
  }
}
