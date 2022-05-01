import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Team, TeamMap } from '../models/team.model';

export class PatchTeams {
  static readonly type = `[dailyFantasyTeams] PatchTeams`;
  constructor(public payload: { teams: Team[] }) {}
}

export class DailyFantasyTeamsStateModel {
  map: TeamMap;
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
  static getMap(state: DailyFantasyTeamsStateModel): TeamMap {
    return state.map;
  }

  @Action(PatchTeams)
  patchPlayers({ getState, patchState }: StateContext<DailyFantasyTeamsStateModel>, { payload: { teams } }: PatchTeams) {
    const state = getState();
    const map = entityMap(teams, team => team.rgId ?? team.id);

    patchState({ ...state, map });
  }
}
