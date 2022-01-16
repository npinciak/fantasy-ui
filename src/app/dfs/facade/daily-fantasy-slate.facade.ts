import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchSlateAttr } from '../state/daily-fantasy-slate-attr.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateFacade {
  constructor(private store: Store) {}

  fetchSlateAttr(sport: string, site: string, slateId: string) {
    return this.store.dispatch(new FetchSlateAttr({ sport, site, slateId }));
  }
}
