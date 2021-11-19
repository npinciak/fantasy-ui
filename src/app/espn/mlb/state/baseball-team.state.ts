import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { Team } from '../models/team.model';

export class PatchTeams {
  static readonly type = `[baseballTeam] PatchTeams`;
  constructor(public payload: { teams: Team[] }) {}
}

interface BaseballTeamStateModel {
  map: { [id: string]: Team };
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

  @Action(PatchTeams)
  patchTeams(ctx: StateContext<BaseballTeamState>, { payload: { teams } }: PatchTeams) {
    ctx.patchState(entityMap(teams, team => team.id));
  }
}
