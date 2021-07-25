import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseballTeam } from '../class/baseballTeam.class';

import { MlbTeamSelectors } from '../selectors/mlb-team.selectors';
import { BaseballPlayer } from '../class/baseballPlayer.class';
import { UpdateStatType } from '../actions/mlb.actions';

@Injectable({
  providedIn: 'root',
})
export class MlbTeamFacade {
  @Select(MlbTeamSelectors.selectStatTypeId) statTypeId$: Observable<number>;
  @SelectSnapshot(MlbTeamSelectors.teamsEmpty) public teamsEmpty: boolean;

  constructor(private store: Store) {}

  selectBaseballTeamById = (id: number): BaseballTeam => this.store.selectSnapshot(MlbTeamSelectors.selectBaseballTeamById)(id);
  selectTeamStartingBatters = (id: number): BaseballPlayer[] => this.store.selectSnapshot(MlbTeamSelectors.getTeamStartingBatters)(id);
  selectTeamBenchBatters = (id: number): BaseballPlayer[] => this.store.selectSnapshot(MlbTeamSelectors.getTeamBenchBatters)(id);
  selectTeamStartingPitchers = (id: number): BaseballPlayer[] => this.store.selectSnapshot(MlbTeamSelectors.getTeamStartingPitchers)(id);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Dispatch() updateStatType = id => new UpdateStatType(id);
}
