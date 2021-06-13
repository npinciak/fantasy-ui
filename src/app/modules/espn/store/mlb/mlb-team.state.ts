import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';
import { EspnService } from '../../espn.service';

export interface MlbTeamStateModel {
  isLoading: boolean;
}

@State<MlbTeamStateModel>({
  name: 'mlbTeam',
  defaults: {
    isLoading: true
  }
})

@Injectable()
export class MlbTeamState {

  constructor(private espnService: EspnService) { }

  @Selector()
  public static getState(state: MlbTeamStateModel) {
    return state;
  }

  @Selector([MlbTeamState.getState])
  public static isLoading(_: MlbTeamStateModel, getState: MlbTeamStateModel) {
    return getState.isLoading;
  }

}
