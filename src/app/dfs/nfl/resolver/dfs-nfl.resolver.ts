import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DfsNflGridIronFacade } from '../facade/dfs-nfl-gridiron.facade';
import { DfsNflSlateDetailsFacade } from '../facade/dfs-nfl-slate-details.facade';

@Injectable({
  providedIn: 'root',
})
export class DfsNflResolver implements Resolve<void> {
  constructor(private dfsNflSlateDetailsFacade: DfsNflSlateDetailsFacade, private dfsNflGridIronFacade: DfsNflGridIronFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    await firstValueFrom(this.dfsNflSlateDetailsFacade.fetch());
    await firstValueFrom(this.dfsNflGridIronFacade.fetch());
  }
}
