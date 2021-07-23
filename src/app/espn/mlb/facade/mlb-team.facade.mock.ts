import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';

import { BaseballTeam } from '../class/baseballTeam.class';

import { MlbTeamSelectors } from '../selectors/mlb-team.selectors';
import { BaseballPlayer } from '../class/baseballPlayer.class';
import { MlbTeamFacade } from './mlb-team.facade';
import { MOCK_DATA_CLASS } from '@app/@shared/helpers/testConfigs';

export type Mock<T> = { [key in keyof T]: T[key] };

@Injectable({
  providedIn: 'root',
})
export class MockMlbTeamFacade implements Mock<MlbTeamFacade> {
  public teamsEmpty: boolean;

  selectBaseballTeamById = (id: number): BaseballTeam => MOCK_DATA_CLASS.BASEBALL_TEAM;
  selectTeamStartingBatters = (): BaseballPlayer[] => [MOCK_DATA_CLASS.BASEBALL_PLAYER];
  selectTeamBenchBatters = (): BaseballPlayer[] => [MOCK_DATA_CLASS.BASEBALL_PLAYER];
  selectTeamStartingPitchers = (): BaseballPlayer[] => [MOCK_DATA_CLASS.BASEBALL_PLAYER];
}
