import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { DfsSelectedLineupFacade } from '@app/dfs/facade/dfs-selected-lineup.facade';
import { DfsNflSelectedLineupSelector } from '../selectors/dfs-nfl-selected-lineup.selector';

@Injectable({
  providedIn: 'root',
})
export class DfsNflSelectedLineupFacade extends DfsSelectedLineupFacade {
  getSelectedPlayers$ = select(DfsNflSelectedLineupSelector.getSelectedPlayers);
}
