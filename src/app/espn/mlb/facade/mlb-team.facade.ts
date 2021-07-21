import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game } from '../class/game.class';
import { BaseballTeam } from '../class/team.class';

import { MlbTeamSelectors } from '../selectors/mlb-team.selectors';
import { BaseballPlayer } from '../class/player.class';

@Injectable({
  providedIn: 'root',
})
export class MlbTeamFacade {
  @SelectSnapshot(MlbTeamSelectors.teamsEmpty) public teamsEmpty: boolean;

  constructor(private store: Store) {}

  selectBaseballTeamById = (id: number): BaseballTeam => this.store.selectSnapshot(MlbTeamSelectors.selectBaseballTeamById)(id);
  selectTeamStartingBatters = (id: number): BaseballPlayer[] => this.store.selectSnapshot(MlbTeamSelectors.getTeamStartingBatters)(id);
  selectTeamBenchBatters = (id: number): BaseballPlayer[] => this.store.selectSnapshot(MlbTeamSelectors.getTeamBenchBatters)(id);
  selectTeamStartingPitchers = (id: number): BaseballPlayer[] => this.store.selectSnapshot(MlbTeamSelectors.getTeamStartingPitchers)(id);
}
