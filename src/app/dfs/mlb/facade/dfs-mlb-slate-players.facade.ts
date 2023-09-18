import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DfsSlatePlayers } from '@app/dfs/actions/dfs-slate-players.actions';
import { DailyFantasyMlbPlayerSelectors } from '../selectors/daily-fantasy-mlb-players.selectors';

@Injectable({ providedIn: 'root' })
export class DfsMlbSlatePlayerFacade extends GenericFacade({
  selectorClass: DailyFantasyMlbPlayerSelectors,
  actionHandler: DfsSlatePlayers,
}) {
  getPlayerTableData$ = select(DailyFantasyMlbPlayerSelectors.getPlayerTableData);
}
