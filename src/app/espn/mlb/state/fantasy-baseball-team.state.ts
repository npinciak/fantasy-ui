import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BaseballTeam, BaseballTeamMap } from '../models/baseball-team.model';

export class PatchFantasyBaseballTeams {
  static readonly type = `[fantasyBaseballTeam] PatchFantasyBaseballTeams`;
  constructor(public payload: { teams: BaseballTeam[] }) {}
}

interface FantasyBaseballTeamStateModel {
  map: BaseballTeamMap;
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
  static map(state: FantasyBaseballTeamStateModel): BaseballTeamMap {
    return state.map;
  }

  @Action(PatchFantasyBaseballTeams)
  patchTeams({ patchState, getState }: StateContext<FantasyBaseballTeamStateModel>, { payload: { teams } }: PatchFantasyBaseballTeams) {
    const state = getState();
    const map = entityMap(teams, team => team.id);
    patchState({ ...state, map });
  }
}
