import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ShellFacade } from '@app/@core/shell/facade/shell.facade';
import { EspnFeedFacade } from '../facade/espn-feed.facade';

@Injectable({
  providedIn: 'root',
})
export class EspnResolver implements Resolve<void> {
  constructor(readonly shellFacade: ShellFacade, readonly espnFeedFacade: EspnFeedFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    // await this.espnFeedFacade.fetchFeed();
    await this.shellFacade.showFastcastScoreboard(true);
  }
}
