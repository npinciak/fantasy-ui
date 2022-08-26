import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyBaseballPlayerSelector } from '../selectors/fantasy-baseball-player.selector';
import { FetchBaseballPlayerNews } from '../state/fantasy-baseball-player.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballPlayerFacade extends GenericFacade(FantasyBaseballPlayerSelector) {
  constructor(private store: Store) {
    super();
  }

  getPlayerNews(playerId: string, lookbackDays = '7'): Observable<void> {
    return this.store.dispatch(new FetchBaseballPlayerNews({ playerId, lookbackDays }));
  }
}
