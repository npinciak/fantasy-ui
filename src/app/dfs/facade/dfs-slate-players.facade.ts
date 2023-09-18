import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSlatePlayers } from '../actions/dfs-slate-players.actions';
import { DfsSlatePlayersSelectors } from '../selectors/dfs-slate-players.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsSlatePlayersFacade extends GenericFacade({ selectorClass: DfsSlatePlayersSelectors, actionHandler: DfsSlatePlayers }) {
  playersEmpty$ = select(DfsSlatePlayersSelectors.getSlatesEmpty);

  constructor(private store: Store) {
    super();
  }

  fetchPlayers(slatePath: string): Observable<void> {
    return this.store.dispatch(new DfsSlatePlayers.Fetch({ slatePath }));
  }
}
