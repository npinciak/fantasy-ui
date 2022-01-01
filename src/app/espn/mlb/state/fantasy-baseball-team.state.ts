import { Injectable } from '@angular/core';
import { setMap } from '@app/@shared/operators';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { Team } from '../models/team.model';

export class PatchTeams {
  static readonly type = `[fantasyBaseballTeam] PatchTeams`;
  constructor(public payload: { teams: Team[] }) {}
}

interface FantasyBaseballTeamStateModel {
  map: { [id: string]: Team };
}

@State<FantasyBaseballTeamStateModel>({
  name: 'fantasyBaseballTeams',
  defaults: {
    map: {},
  },
})
@Injectable()
export class FantasyBaseballTeamState {
  constructor() {}

  @Selector()
  static getBaseballTeamMap(state: FantasyBaseballTeamStateModel) {
    return state.map;
  }

  @Action(PatchTeams)
  patchTeams(ctx: StateContext<FantasyBaseballTeamStateModel>, { payload: { teams } }: PatchTeams) {
    ctx.setState(setMap(teams, team => team.id));
  }
}
