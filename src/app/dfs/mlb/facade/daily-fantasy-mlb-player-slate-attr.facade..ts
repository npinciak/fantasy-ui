import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { FetchSlateAttr } from '@app/dfs/state/daily-fantasy-slate-attr.state';
import { Store } from '@ngxs/store';
import { DailyFantasyMlbPlayerSlateAttributeSelectors } from '../selectors/daily-fantasy-mlb-player-slate-attr.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyMlbPlayerSlateAttrFacade extends GenericFacade(DailyFantasyMlbPlayerSlateAttributeSelectors) {
  constructor(private store: Store) {
    super();
  }

  fetchSlateAttr(sport: string, site: string, slateId: string): void {
    this.store.dispatch(new FetchSlateAttr({ sport, site, slate: slateId }));
  }
}
