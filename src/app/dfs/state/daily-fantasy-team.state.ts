import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Team } from '../models/team.model';

export class PatchTeams {
  static readonly type = `[dailyFantasyTeams] PatchTeams`;
  constructor(public payload: { teams: Team[] }) {}
}

export class DailyFantasyTeamsStateModel {
  map: { [id: string]: Team };
}

@State<DailyFantasyTeamsStateModel>({
  name: 'dailyFantasyTeams',
  defaults: {
    map: {},
  },
})
@Injectable()
export class DailyFantasyTeamsState {
  @Selector([DailyFantasyTeamsState])
  static getMap(state: DailyFantasyTeamsStateModel): { [id: string]: Team } {
    return state.map;
  }

  @Action(PatchTeams)
  patchPlayers({ getState, patchState }: StateContext<DailyFantasyTeamsStateModel>, { payload: { teams } }: PatchTeams) {
    const state = getState();
    const map = entityMap(teams);

    patchState({ ...state, map });
  }
}
