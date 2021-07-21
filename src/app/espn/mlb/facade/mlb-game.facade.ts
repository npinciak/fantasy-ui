import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game } from '../class/game.class';
import { BaseballTeam } from '../class/team.class';

import { EventMap, GameMap, ScheduleMap, TeamMap } from '../state/mlb-state.model';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { MlbState } from '../state/mlb.state';
import { EspnEvent } from '../interface';
import { MlbSelectors } from '../selectors/mlb.selectors';
import { MlbTeamSelectors } from '../selectors/mlb-team.selectors';
import { BaseballPlayer } from '../class/player.class';
import { MlbGameSelectors } from '../selectors/mlb-game.selectors';

@Injectable({
  providedIn: 'root',
})
export class MlbGameFacade {
  @Select(MlbGameSelectors.getSortedGamesByStartTime) public sortedGamesByStartTime$: Observable<Game[]>;
  @Select(MlbGameSelectors.noGames) public noGames$: Observable<boolean>;

  @SelectSnapshot(MlbGameSelectors.getNumberOfGames) public numberOfGames$: Observable<number>;

  constructor(private store: Store) {}

  selectGameById = (id: number): Game => this.store.selectSnapshot(MlbGameSelectors.selectGameById)(id);
}
