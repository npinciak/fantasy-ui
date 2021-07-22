import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseballGame } from '../class/game.class';
import { MlbGameSelectors } from '../selectors/mlb-game.selectors';

@Injectable({
  providedIn: 'root',
})
export class MlbGameFacade {
  @Select(MlbGameSelectors.getSortedGamesByStartTime) public sortedGamesByStartTime$: Observable<BaseballGame[]>;
  @Select(MlbGameSelectors.noGames) public noGames$: Observable<boolean>;

  @SelectSnapshot(MlbGameSelectors.getNumberOfGames) public numberOfGames$: Observable<number>;

  constructor(private store: Store) {}

  selectGameById = (id: number): BaseballGame => this.store.selectSnapshot(MlbGameSelectors.selectGameById)(id);
}
