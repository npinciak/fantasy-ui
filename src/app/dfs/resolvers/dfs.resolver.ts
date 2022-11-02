import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UrlQueryParams } from '@app/@core/store/router/url-builder';
import { exists } from '@app/@shared/helpers/utils';
import { Store } from '@ngxs/store';
import { FetchSlates } from '../actions/daily-fantasy-slates.actions';

@Injectable({
  providedIn: 'root',
})
export class DfsResolver implements Resolve<void> {
  constructor(private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const site = route.queryParamMap.get(UrlQueryParams.Site);
    const sport = route.queryParamMap.get(UrlQueryParams.Sport);

    if (exists(site) && exists(sport)) {
      this.store.dispatch(new FetchSlates({ site, sport })).toPromise();
    }
  }
}
