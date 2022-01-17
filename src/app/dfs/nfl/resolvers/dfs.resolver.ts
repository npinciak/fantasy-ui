import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DailyFantasySlateFacade } from '@app/dfs/facade/daily-fantasy-slate.facade';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class NFLDfsResolver implements Resolve<void> {
  constructor(readonly slateFacade: DailyFantasySlateFacade, private store: Store) {}

  resolve(route: ActivatedRouteSnapshot) {}
}
