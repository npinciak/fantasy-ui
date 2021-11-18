import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';

import { BaseballTeam } from '../models/baseball-team.model';

interface BaseballTeamStateModel {
  map: { [id: string]: BaseballTeam };
}

@State<BaseballTeamStateModel>({
  name: 'baseballTeam',
  defaults: {
    map: {},
  },
})
@Injectable()
export class BaseballTeamState {
  constructor() {}

  @Selector()
  static getBaseballTeamMap(state: BaseballTeamStateModel) {
    return state.map;
  }
}
