import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsResolver implements Resolve<void> {
  constructor(private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    // await this.store.dispatch(new FetchFantasyFootballFreeAgents()).toPromise();
  }
}
