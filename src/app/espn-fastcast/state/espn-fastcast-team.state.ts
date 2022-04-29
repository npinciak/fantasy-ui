import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FastcastEventTeam } from '../models/fastcast-team.model';

export class PatchFastcastTeams {
  static readonly type = `[espnFastcastTeam] PatchFastcastTeams`;
  constructor(public payload: { map: Record<string, FastcastEventTeam> }) {}
}

export interface EspnFastcastTeamStateModel {
  map: Record<string, FastcastEventTeam>;
}

@State<EspnFastcastTeamStateModel>({
  name: 'espnFastcastTeams',
  defaults: {
    map: {},
  },
})
@Injectable()
export class EspnFastcastTeamState {
  @Selector()
  static selectMap(state: EspnFastcastTeamStateModel): Record<string, FastcastEventTeam> {
    return state.map;
  }

  @Action(PatchFastcastTeams)
  patchFastcastTeams({ patchState, getState }: StateContext<EspnFastcastTeamStateModel>, { payload: { map } }: PatchFastcastTeams): void {
    patchState({ ...getState(), map });
  }
}
