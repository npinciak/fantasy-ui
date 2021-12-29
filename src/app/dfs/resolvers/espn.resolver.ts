import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ShellFacade } from '@app/@core/shell/facade/shell.facade';

@Injectable({
  providedIn: 'root',
})
export class DfsResolver implements Resolve<void> {
  constructor(readonly shellFacade: ShellFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    await this.shellFacade.showFastcastScoreboard(true);
  }
}
