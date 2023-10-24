import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DfsNflGridIronFacade } from '../facade/dfs-nfl-gridiron.facade';
import { DfsNflSlateDetailsFacade } from '../facade/dfs-nfl-slate-details.facade';

@Injectable({
  providedIn: 'root',
})
export class DfsNflResolver implements Resolve<void> {
  constructor(private dfsNflSlateDetailsFacade: DfsNflSlateDetailsFacade, private dfsNflGridIronFacade: DfsNflGridIronFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    await this.dfsNflSlateDetailsFacade.fetch().toPromise();
    await this.dfsNflGridIronFacade.fetch().toPromise();
  }
}
