import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { EspnClientTeam } from '@app/espn/espn-client.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';

export class PatchTeams {
  static readonly type = `[fantasyBaseballTeam] PatchTeams`;
  constructor(public payload: { teams: EspnClientTeam[] }) {}
}

interface FantasyBaseballTeamStateModel {
  map: { [id: string]: EspnClientTeam };
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
  patchTeams({ patchState, getState }: StateContext<FantasyBaseballTeamStateModel>, { payload: { teams } }: PatchTeams) {
    const state = getState();
    const map = entityMap(teams, team => team.id);
    patchState({ ...state, map });
  }
}
