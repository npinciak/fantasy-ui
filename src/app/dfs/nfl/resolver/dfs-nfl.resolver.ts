import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DfsNflSlateDetailsFacade } from '../facade/dfs-nfl-slate-details.facade';

@Injectable({
  providedIn: 'root',
})
export class DfsNflResolver implements Resolve<void> {
  constructor(private dfsNflSlateDetailsFacade: DfsNflSlateDetailsFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    await firstValueFrom(this.dfsNflSlateDetailsFacade.fetch());
  }
}
