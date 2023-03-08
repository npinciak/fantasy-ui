import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UrlQueryParams } from '@app/@core/store/router/url-builder';
import { exists } from '@app/@shared/utilities/utilities.m';
import { Store } from '@ngxs/store';
import { DfsSlates } from '../actions/dfs-slates.actions';

@Injectable({
  providedIn: 'root',
})
export class DfsResolver implements Resolve<void> {
  constructor(private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const site = route.queryParamMap.get(UrlQueryParams.Site);

    const sport = route.data.sport;

    if (exists(site) && exists(sport)) {
      this.store.dispatch(new DfsSlates.Fetch({ site, sport })).toPromise();
    }
  }
}
