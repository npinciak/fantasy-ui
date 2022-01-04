import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ShellFacade } from '@app/@core/shell/facade/shell.facade';
import { UrlFragments } from '@app/@shared/url-builder';
import { EspnFeedFacade } from '../facade/espn-feed.facade';

@Injectable({
  providedIn: 'root',
})
export class EspnResolver implements Resolve<void> {
  constructor(readonly shellFacade: ShellFacade, readonly espnFeedFacade: EspnFeedFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const leagueId = route.paramMap.get('leagueId');

    await this.espnFeedFacade.fetchFeed();
    await this.shellFacade.showFastcastScoreboard(false);
  }
}
