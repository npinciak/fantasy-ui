import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PatchFastcastTeams } from '../actions/espn-fastcast-team.actions';
import { FastcastEventTeam } from '../models/fastcast-team.model';

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
