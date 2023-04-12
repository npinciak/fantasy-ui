import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { Store } from '@ngxs/store';
import { DfsMlbSlatePlayer } from '../actions/dfs-mlb-slate-player.actions';
import { DailyFantasyMlbPlayerSlateAttributeSelectors } from '../selectors/daily-fantasy-mlb-player-slate-attr.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyMlbPlayerSlateAttrFacade extends GenericFacade({
  selectorClass: DailyFantasyMlbPlayerSlateAttributeSelectors,
  actionHandler: DfsMlbSlatePlayer,
}) {
  constructor(private store: Store) {
    super();
  }

  fetchSlateAttr(slate: string): void {
    this.store.dispatch(new DfsMlbSlatePlayer.Fetch({ slate }));
  }
}
